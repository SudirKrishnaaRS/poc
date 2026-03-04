import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// We isolate the ach-form-related routes into their own module/router.
// Endpoint(trpc): /trpc/ach.submitForm
// JSON Endpoint: POST /api/ach-form-submit
export const achRouter = router({
  submitForm: publicProcedure
    .meta({
      openapi: {
        method: 'POST', // standard HTTP method
        path: '/ach-form-submit', // standard REST URL path
        tags: ['ACH'], // Category for our Swagger UI docs
        summary: 'Submit ACH Form Data', // Description for our Swagger docs
      },
    })
    // Define the expected input payload and its validations using Zod
    .input(z.object({
      accountType: z.enum(['savings', 'checking'], { required_error: "Account type is required" }),
      routingNumber: z.string().length(9, "Routing number must exactly be 9 digits").regex(/^\d+$/, "Routing number must only contain digits"),
      accountNumber: z.string().min(4, "Account number must be at least 4 digits").regex(/^\d+$/, "Account number must only contain digits"),
      accountNickname: z.string().optional(),
      displayName: z.string({ required_error: "Display name is required" })
    }))
    // Define the exact shape of the response data
    .output(z.object({
      displayName: z.string(),
      methodOfPayment: z.string(),
      requestId: z.string(),
      routingNumber: z.string(),
      accountNumber: z.string(), // Masked version
      accountNickname: z.string().optional()
    }))
    // .mutation() is used for POST/PUT/DELETE requests that modify data or submit forms
    .mutation(({ input }) => {
      // 1. Process the incoming input data
      const { accountType, routingNumber, accountNumber, accountNickname, displayName } = input;
      
      // 2. Perform business logic (e.g. Mask the account number)
      // We grab everything EXCEPT the last 4 characters and replace them with '*'
      const maskedAccountNumber = accountNumber.slice(0, -4).replace(/./g, '*') + accountNumber.slice(-4);
      
      // Mock generating a unique request ID (would usually come from a database insertion)
      const mockRequestId = Math.floor(Math.random() * 100000000000).toString();

      // 3. Return the exact shape defined in the `.output()` schema
      return {
        displayName: displayName,
        methodOfPayment: "Bank Transfer",
        requestId: mockRequestId,
        routingNumber: routingNumber,
        accountNumber: maskedAccountNumber,
        ...(accountNickname ? { accountNickname } : {}) // conditionally add nickname if it exists
      };
    }),
});

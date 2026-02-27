import { NextResponse } from "next/server";

// POC local subdomain mapping.
const PRIMARY_BASE_URL = "http://sa.lvh.me:3001";
const PAYMENT_BASE_URL = "http://payment.lvh.me:3000";

export async function GET() {
  // clear sa app session and return to sa home.
  const primaryHomeUrl = new URL("/", PRIMARY_BASE_URL);
  const primaryLogoutUrl = new URL("/auth/logout", PRIMARY_BASE_URL);
  primaryLogoutUrl.searchParams.set("returnTo", primaryHomeUrl.toString());

  // clear payment app session, then continue to sa logout.
  const paymentLogoutUrl = new URL("/auth/logout", PAYMENT_BASE_URL);
  paymentLogoutUrl.searchParams.set("returnTo", primaryLogoutUrl.toString());

  return NextResponse.redirect(paymentLogoutUrl);
}

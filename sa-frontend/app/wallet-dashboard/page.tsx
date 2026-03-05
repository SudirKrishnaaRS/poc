export default function WalletDashboardPage() {
  return (
    <div className="flex items-center justify-center bg-white min-h-screen">
      <div className="bg-gray-50 p-8 rounded-lg shadow-md space-y-4 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-xl font-bold">Wallet Dashboard</h1>
          <h3 className="text-gray-500 text-sm">(Primary Domain)</h3>
        </div>

        <p className="text-gray-600">
          This is the wallet dashboard for the primary domain.
        </p>
        <a
          href="http://payment.lvh.me:3000/wallet-trpc"
          className="inline-flex rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Add lease payment
        </a>
        {/* <div>
          <h2 className="text-gray-600">iFrame</h2>
          <iframe
            src="http://payment.lvh.me:3000/wallet-trpc"
            width="100%"
            height="600"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
}

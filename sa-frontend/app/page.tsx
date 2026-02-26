import { auth0 } from "@/auth0";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <main className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">SA Primary Domain</h1>
        <p className="mt-3 text-slate-600">
          This app represents <strong>sa.com</strong> in the POC.
        </p>

        {!user ? (
          <div className="mt-8">
            <p className="mb-4 text-sm text-slate-600">
              You are not logged in.
            </p>
            <a
              href="/auth/login"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Log In
            </a>
          </div>
        ) : (
          <div className="mt-8">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Logged in user
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {user.name || "User"}
              </p>
              <p className="text-sm text-slate-500">
                {user.email || "No email available"}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/auth/logout"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Log Out
              </a>
              <a
                href="http://sa.lvh.me:3000/wallet"
                className="inline-flex rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Go to Wallet (Existing Frontend)
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Now explain me what you did step by step like a documentation so that I can add it to readme and

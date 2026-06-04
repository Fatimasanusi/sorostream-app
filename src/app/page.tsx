import Link from "next/link";
import WalletConnect from "@/components/WalletConnect";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-sky-950 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <span className="text-xl font-bold tracking-tight">SoroStream</span>
        <WalletConnect />
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
          Stream Money<br />
          <span className="text-sky-400">Like Data</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Real-time USDC payments on Stellar Soroban — by the second. Salaries,
          subscriptions, vesting schedules, and grant disbursements.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="rounded-xl bg-sky-500 px-8 py-3 font-semibold text-white hover:bg-sky-400 transition-colors"
          >
            Launch App
          </Link>
          <Link
            href="/stream/new"
            className="rounded-xl border border-slate-500 px-8 py-3 font-semibold text-slate-200 hover:border-slate-300 transition-colors"
          >
            Create Stream
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Lock Funds",
              desc: "Deposit USDC into the stream contract. Set your recipient, amount, and duration.",
            },
            {
              step: "2",
              title: "Stream Flows",
              desc: "Tokens accumulate every second at your configured flow rate. Real-time, on-chain.",
            },
            {
              step: "3",
              title: "Claim Anytime",
              desc: "Recipient withdraws earned USDC at any point. Cancel anytime to reclaim unstreamed funds.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 font-bold text-white">
                {step}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{title}</h3>
              <p className="text-slate-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats placeholder */}
      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {[
            { label: "Total Streams", value: "—" },
            { label: "USDC Streamed", value: "—" },
            { label: "Active Streams", value: "—" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-3xl font-bold text-sky-400">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

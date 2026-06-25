"use client";
import { useState } from "react";
import DurationPicker from "@/components/DurationPicker";
import FlowRatePreview from "@/components/FlowRatePreview";

function validateRecipient(value: string): string {
  if (!value) return "Recipient address is required.";
  if (!/^G[A-Z2-7]{55}$/.test(value)) return "Must be a valid Stellar public key (starts with G, 56 chars).";
  return "";
}

function validateAmount(value: string): string {
  if (!value) return "Amount is required.";
  if (Number(value) <= 0) return "Amount must be greater than 0.";
  return "";
}

function validateDuration(seconds: number): string {
  if (seconds <= 0) return "Duration must be greater than 0.";
  return "";
}

export default function NewStream() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState(0);
  const [errors, setErrors] = useState({ recipient: "", amount: "", duration: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = {
      recipient: validateRecipient(recipient),
      amount: validateAmount(amount),
      duration: validateDuration(duration),
    };
    setErrors(next);
    if (next.recipient || next.amount || next.duration) return;
    // TODO: submit stream
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-8">Create Stream</h1>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Recipient Address</label>
            <input
              value={recipient}
              onChange={e => { setRecipient(e.target.value); setErrors(prev => ({ ...prev, recipient: "" })); }}
              placeholder="G..."
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
            />
            {errors.recipient && <p className="text-red-400 text-sm mt-1">{errors.recipient}</p>}
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-2">Amount (USDC)</label>
            <input
              value={amount}
              onChange={e => { setAmount(e.target.value); setErrors(prev => ({ ...prev, amount: "" })); }}
              placeholder="100"
              type="number"
              min="0"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
            />
            {errors.amount && <p className="text-red-400 text-sm mt-1">{errors.amount}</p>}
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-2">Duration</label>
            <DurationPicker onChange={s => { setDuration(s); setErrors(prev => ({ ...prev, duration: "" })); }} />
            {errors.duration && <p className="text-red-400 text-sm mt-1">{errors.duration}</p>}
          </div>
          {amount && duration > 0 && <FlowRatePreview amount={amount} durationSeconds={duration} />}
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
            Create Stream
          </button>
        </form>
      </div>
    </main>
  );
}

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import StreamCard from "@/components/StreamCard";
import { getMockStreams, sorostream, type StreamData } from "@/src/lib/sorostream";
import { useToast } from "@/src/lib/toast";

export default function Dashboard() {
  const [streams, setStreams] = useState<StreamData[]>([]);
  const [claiming, setClaiming] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    setStreams(getMockStreams());
  }, []);

  async function handleClaimAll() {
    setClaiming(true);
    try {
      const ids = streams.filter(s => s.status === "Active").map(s => s.id);
      if (ids.length === 0) {
        addToast("No active streams to claim from", "info");
        return;
      }
      const result = await sorostream.batchWithdraw(ids);
      addToast(`Claimed all — batch tx: ${result.txHash.slice(0, 8)}...`, "success");
    } catch {
      addToast("Batch claim failed. Please try again.", "error");
    } finally {
      setClaiming(false);
    }
  }

  const activeStreams = streams.filter(s => s.status === "Active");

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-3">
            {activeStreams.length > 0 && (
              <button
                onClick={handleClaimAll}
                disabled={claiming}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {claiming ? "Claiming..." : `Claim All (${activeStreams.length})`}
              </button>
            )}
            <Link href="/stream/new" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
              + New Stream
            </Link>
          </div>
        </div>
        {streams.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400 mb-4">No streams yet</p>
            <Link href="/stream/new" className="text-green-400 hover:text-green-300">Create your first stream →</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {streams.map(stream => (
              <Link key={stream.id} href={`/stream/${stream.id}`}>
                <StreamCard
                  id={stream.id}
                  sender={stream.sender}
                  recipient={stream.recipient}
                  flowRate={stream.flowRate}
                  status={stream.status}
                  deposit={stream.deposit}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

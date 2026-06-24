import StreamTimeline from "@/components/StreamTimeline";
import StreamActions from "@/components/StreamActions";
import { getMockStream } from "@/src/lib/sorostream";
import Link from "next/link";

export const revalidate = 60;

export default async function StreamDetail({ params }: { params: { id: string } }) {
  const stream = getMockStream(params.id);

  if (!stream) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Stream not found</h1>
          <p className="text-gray-400 mb-6">Stream #{params.id} does not exist or has been removed.</p>
          <Link href="/dashboard" className="text-green-400 hover:text-green-300">← Back to Dashboard</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">← Dashboard</Link>
        </div>
        <h1 className="text-2xl font-bold mb-2">Stream #{stream.id}</h1>
        <div className="flex gap-4 text-sm text-gray-400 mb-8">
          <span>From: <span className="text-white font-mono">{stream.sender}</span></span>
          <span>To: <span className="text-white font-mono">{stream.recipient}</span></span>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 space-y-6">
          <StreamTimeline startTime={stream.startTime} endTime={stream.endTime} />
          <StreamActions streamId={stream.id} flowRate={stream.flowRate} lastWithdrawTime={stream.lastWithdrawTime} />
        </div>
      </div>
    </main>
  );
}

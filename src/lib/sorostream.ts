import { SoroStreamClient } from "@sorostream/sdk";
import type { Network, WalletAdapter } from "@sorostream/sdk";

const network = (process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "testnet") as Network;
const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID ?? "";
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

/**
 * Creates a SoroStreamClient instance with the given wallet adapter.
 * Uses env vars for network, contract ID, and RPC URL.
 */
export function createClient(walletAdapter: WalletAdapter): SoroStreamClient {
  return new SoroStreamClient({
    network,
    contractId,
    walletAdapter,
    ...(rpcUrl ? { rpcUrl } : {}),
  });
}

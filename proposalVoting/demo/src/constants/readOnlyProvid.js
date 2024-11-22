import { JsonRpcProvider } from "ethers";

export const readOnlyProvid = new JsonRpcProvider(
  import.meta.env.VITE_BASE_RPC_URL
);

import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { baseSepolia } from "@reown/appkit/networks";
import useContractInstance from "./useContractInstance";

const useCreateFaucet = () => {
  const contract = useContractInstance(true);
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(async (name, symbol) => {
    if (!name || !symbol) {
      toast.error("Please fill all fields");
      return;
    }
    if (!address || !isConnected) {
      toast.error("Please connect wallet");
      return;
    }
    if (!contract) {
      toast.error("Contract not initialized");
      return;
    }
    if (Number(chainId) !== Number(baseSepolia.id)) {
      toast.error("Please switch network to Base Sepolia");
      return;
    }

    try {
      const estimatedGas = await contract.deployClaimFaucet.estimateGas(
        name,
        symbol
      );

      const txn = await contract.deployClaimFaucet(name, symbol, {
        gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
      });
      const receipt = await txn.wait();
      if (receipt.status === 1) {
        toast.success("Faucet deployed successfully");
        return;
      } else {
        toast.error("Something went wrong, failed to create");
      }
    } catch (error) {
      console.error("Error from creating faucet", error);
    }
  });
};

export default useCreateFaucet;

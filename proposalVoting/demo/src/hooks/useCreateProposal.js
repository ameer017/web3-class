import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import useContractInstance from "./useContractInstance";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { baseSepolia } from "@reown/appkit/networks";

const useCreateProposal = () => {
  const contract = useContractInstance(true);
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(async (title, description, quorum) => {
    if (!title || !description || !quorum) {
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
      toast.error("Please switch network to Sepolia");
      return;
    }

    try {
      const estimatedGas = await contract.createProposal.estimateGas(
        title,
        description,
        quorum
      );

      const txn = await contract.createProposal(title, description, quorum, {
        gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
      });
      const receipt = await txn.wait();
      if (receipt.status === 1) {
        toast.success("Proposal created successfully");
        return;
      } else {
        toast.error("Something went wrong, failed to create");
      }
    } catch (error) {
        console.error("Error from creating todo", error);
    }
  });
};

export default useCreateProposal;

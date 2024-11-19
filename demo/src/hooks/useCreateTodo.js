import React, { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { baseSepolia } from "@reown/appkit/networks";

const useCreateTodo = () => {
  const contract = useContractInstance(true);
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(async (title, description) => {
    if (!title || !description) {
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
      const estimatedGas = await contract.createTodo.estimateGas(
        title,
        description
      );
      //   const estimatedGas = await contract.estimateGas.createTodo(
      //     title,
      //     description
      //   );
      const txn = await contract.createTodo(title, description, {
        gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
      });
      const receipt = await txn.wait();
      if (receipt.status === 1) {
        toast.success("Todo created successfully");
        return;
      } else {
        toast.error("Something went wrong, failed to create");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to create todo");
    }
    [contract, address, isConnected, chainId];
  });
};

export default useCreateTodo;

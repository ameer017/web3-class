import React, {useCallback} from "react";
import useContractInstance from "./useContractInstance";
import { toast } from "react-toastify";
import {useTodo} from "../contexr/todoContext"
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { baseSepolia } from "@reown/appkit/networks";


const useEditTodo = () => {
    const contract = useContractInstance(true);
    const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
    const {setTodos} = useTodo()

    return useCallback(async(index, title, description) => {
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
            const estimatedGas = await contract.updateTodo.estimateGas(index,
              title,
              description
            );
            
            const txn = await contract.updateTodo(index, title, description, {
              gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
            });
            const receipt = await txn.wait();
            setTodos(receipt)
            if (receipt.status === 1) {
              toast.success("Todo updated successfully");
              return;
            } else {
              toast.error("Something went wrong, failed to update");
            }
          } catch (error) {
            console.log("Error:", error);
            toast.error("Failed to update todo");
          }

          [contract]
    })


}
export default useEditTodo;

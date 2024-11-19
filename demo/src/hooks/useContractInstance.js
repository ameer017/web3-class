import { useMemo } from "react";
import useSignerOrProvider from "./useSignerOrProvider";
import { Contract } from "ethers";
import CONTRACT_ABI from "../ABI/Todo.json";

const useContractInstance = (withSigner = false) => {
  const { signer, readOnlyProvid } = useSignerOrProvider();
  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null;
      return new Contract(
        import.meta.env.VITE_TODO_CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
    } else {
      return new Contract(
        import.meta.env.VITE_TODO_CONTRACT_ADDRESS,
        CONTRACT_ABI,
        readOnlyProvid
      );
    }
  }, [signer, readOnlyProvid, withSigner]);
};

export default useContractInstance;

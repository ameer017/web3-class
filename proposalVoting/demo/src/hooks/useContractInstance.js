import { useMemo } from "react";
import useSignerOrProvider from "./useSignerOrProvider";
import { Contract } from "ethers";
import CONTRACT_ABI from "../../ABI/Vote.json";

const useContractInstance = (withSigner = false) => {
  const { signer, readOnlyProvid } = useSignerOrProvider();
  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null;
      return new Contract(CONTRACT_ABI.address, CONTRACT_ABI.abi, signer);
    } else {
      return new Contract(
        CONTRACT_ABI.address,
        CONTRACT_ABI.abi,
        readOnlyProvid
      );
    }
  }, [signer, readOnlyProvid, withSigner]);
};

export default useContractInstance;

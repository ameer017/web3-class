import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { readOnlyProvid } from "../constants/readOnlyProvid";

const useSignerOrProvider = () => {
  const [signer, updateSigner] = useState();
  const { walletProvider } = useAppKitProvider("eip155");

  const provider = useMemo(
    () => (walletProvider ? new BrowserProvider(walletProvider) : null),
    [walletProvider]
  );

  useEffect(() => {
    if (!provider) return updateSigner(null);
    provider.getSigner().then((newSigner) => {
      if (!newSigner) return updateSigner(newSigner);
      if (newSigner.address === signer?.address) return;
      updateSigner(newSigner);
    });
  }, [provider, signer]);

  return { signer, provider, readOnlyProvid };
};

export default useSignerOrProvider;

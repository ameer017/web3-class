import React, { useEffect, useState } from "react";
import { useFaucet } from "../context/contractFactory";
import { useAppKitAccount } from "@reown/appkit/react";
import CLAIM from "../ABI/claim.json";

const Faucets = () => {
  const { address } = useAppKitAccount();
  const [faucetData, setFaucetData] = useState([]); // Store token info for each faucet
  const { faucets, getTokenInfo, getUserFaucetBalance } = useFaucet();
// console.log(faucets)
  useEffect(() => {
    const fetchFaucetData = async () => {
      const data = await Promise.all(
        faucets.map(async (faucet) => {
          // const info = await getTokenInfo(faucet.contract);
          // console.log(info)
          const balance = await getUserFaucetBalance(faucet.contract);
          return {
            // name: info.name,
            // symbol: info.symbol,
            balance: balance.toString(),
            contract: faucet.contract,
            deployer: faucet.deployer,
          };
        })
      );
      setFaucetData(data);
    };

    if (faucets.length > 0) {
      fetchFaucetData();
    }
  }, [faucets, getTokenInfo, getUserFaucetBalance]);

  const handleClaim = async (contractAddress) => {
    if (!address) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const claimTokenContract = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_CLAIM_ADDRESS,
        CLAIM,
        signer
      );

      const tx = await claimTokenContract.claimToken(address);
      console.log("Transaction submitted:", tx);

      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);

      alert("Faucet claimed successfully!");
    } catch (error) {
      console.error("Error claiming token:", error);
      alert("Failed to claim faucet. Check the console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Faucet Dashboard
      </h1>
      <div className="space-y-6 max-w-4xl mx-auto">
        {faucetData.map((faucet, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Faucet {index + 1}
            </h2>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Name:</span>{" "}
              <span className="font-mono text-gray-800">{faucet.name}</span>
              <br />
              <span className="font-semibold">Symbol:</span>{" "}
              <span className="font-mono text-gray-800">{faucet.symbol}</span>
              <br />
              <span className="font-semibold">Balance:</span>{" "}
              <span className="font-mono text-gray-800">{faucet.balance}</span>
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Deployer Address:</span>{" "}
              <span className="font-mono text-gray-800">{faucet.deployer}</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold">Contract Address:</span>{" "}
              <span className="font-mono text-gray-800">{faucet.contract}</span>
            </p>
            <button
              onClick={() => handleClaim(faucet.contract)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
            >
              Claim Faucet
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faucets;

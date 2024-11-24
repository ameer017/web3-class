import React, { useEffect, useState } from "react";
import { useFaucet } from "../context/contractFactory";
import { useAppKitAccount } from "@reown/appkit/react";

const Faucets = () => {
  const { address } = useAppKitAccount();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [bal, setBal] = useState(0);
  const {
    faucets,
    userFaucets,
    totalContracts,
    getTokenInfo,
    claimFaucet,
    getUserFaucetBalance,
  } = useFaucet();

  useEffect(() => {
    // console.log("All Faucets:", faucets);
    // console.log("User Faucets:", userFaucets);
    // console.log("Total Deployed Contracts:", totalContracts);
  }, [faucets, userFaucets, totalContracts, address]);

  const handleClaim = async (contractAddress) => {
    await claimFaucet(contractAddress);
  };

  const handleGetTokenInfo = async (contractAddress) => {
    const info = await getTokenInfo(contractAddress);
    console.log("Token Info:", info);
    setName(info.name);
    setSymbol(info.symbol);
  };

  const handleGetBalance = async (contractAddress) => {
    const balance = await getUserFaucetBalance(contractAddress);
    setBal(balance.toString());
    console.log("Faucet Balance:", balance.toString());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Faucet Dashboard
      </h1>
      <div className="space-y-6 max-w-4xl mx-auto">
        {faucets.map((faucet, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Faucet {index + 1}
            </h2>

            <p className="text-sm text-gray-500">
              {name && symbol && (
                <>
                  <span className="font-semibold"> Name: {name} </span> <br />
                  <span className="font-mono text-gray-800">
                    Symbol: {symbol}
                  </span>
                  <br />
                </>
              )}
              {bal && (
                <span className="font-mono text-gray-800">Balance: {bal}</span>
              )}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Deployer Address:</span>{" "}
              <span className="font-mono text-gray-800">{faucet.deployer}</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold">Contract Address:</span>{" "}
              <span className="font-mono text-gray-800">{faucet.contract}</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleClaim(faucet.contract)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
              >
                Claim Faucet
              </button>
              {address?.toLowerCase() === faucet.deployer.toLowerCase() && (
                <>
                  <button
                    onClick={() => handleGetTokenInfo(faucet.contract)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring focus:ring-green-300"
                  >
                    Get Token Info
                  </button>
                  <button
                    onClick={() => handleGetBalance(faucet.contract)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring focus:ring-gray-300"
                  >
                    Get Balance
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faucets;

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import CLAIMABI from "./utils/ABI.json";
import "./App.css";

function App() {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState({
    lastClaimedTime: null,
    totalClaimed: null,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  async function requestAccount() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnected(true);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      setMessage("MetaMask not found! Please install it.");
    }
  }

  async function claimFaucet() {
    if (timeLeft && timeLeft > 0) {
      setMessage(`You can claim again in ${Math.ceil(timeLeft / 3600)} hours.`);
      return;
    }

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CLAIMABI.address,
        CLAIMABI.abi,
        signer
      );

      try {
        setLoading(true);
        const tx = await contract.claimToken();
        await tx.wait();
        setMessage("Token Claim Successful, check back after 24 hours");
        getUserData();
      } catch (err) {
        console.error("Error:", err);
        setMessage("Error: " + (err.reason || "Transaction failed"));
      } finally {
        setLoading(false);
      }
    } else {
      await requestAccount();
    }
  }

  async function getUserData() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CLAIMABI.address,
        CLAIMABI.abi,
        signer
      );

      try {
        const userData = await contract.getUserData();
        const lastClaimedTime = Number(userData[0]);
        const totalClaimed = userData[1].toString();
        const currentTime = new Date().getTime()

        const timeSinceLastClaim = currentTime - lastClaimedTime;
        const timeLeftForNextClaim = 86400 - timeSinceLastClaim;

        setTimeLeft(timeLeftForNextClaim > 0 ? timeLeftForNextClaim : 0);

        setData({
          lastClaimedTime: new Date(lastClaimedTime * 1000).toLocaleString(),
          totalClaimed: totalClaimed,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    } else {
      await requestAccount();
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="App">
      <button onClick={requestAccount}>
        {connected ? "Connected" : "Connect Wallet"}
      </button>
      <h1>Claim Token Faucet</h1>
      <div>
        <p>
          <strong>Last Claimed Time:</strong> {data.lastClaimedTime || "N/A"}
        </p>
        <p>
          <strong>Total Claimed:</strong> {data.totalClaimed || "N/A"} DLT
        </p>
      </div>
      <div className="btns">
        <button
          type="button"
          onClick={claimFaucet}
          disabled={loading || (timeLeft && timeLeft > 0)}
        >
          {loading ? "Claiming..." : "Claim Token"}
        </button>
      </div>
      {timeLeft && timeLeft > 0 && (
        <p>{`You can claim again in ${Math.ceil(timeLeft / 3600)} hours.`}</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

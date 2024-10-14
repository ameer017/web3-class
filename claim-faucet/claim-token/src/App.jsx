import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import CLAIMABI from "./utils/ABI.json";

function App() {
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);
  const [success, setSucess] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    setConnected(true);
  }

  async function claimFaucet() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CLAIMABI.address,
        CLAIMABI.abi,
        signer
      );

      try {
        const getToken = await contract.claimToken();
        setToken(getToken);
        setSucess(true);
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      await requestAccount();
    }
  }

  useEffect(() => {
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
          setData(userData);
        } catch (err) {
          console.error("Error:", err);
        }
      } else {
        await requestAccount();
      }
    }
    getUserData();
    console.log(data);
  }, []);

  return (
    <div className="App">
      <button onClick={requestAccount}>
        {" "}
        {connected ? "Connected" : "Connect Wallet"}{" "}
      </button>
      <h1>Calim Token Faucet</h1>
      <form>
        <h2>{/* <span>Token:</span> {token} */}</h2>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter amount"
        />
        <div className="btns">
          <button type="button" onClick={claimFaucet}>
            Claim Token
          </button>
        </div>
      </form>
      if(success) {alert("Success")}
    </div>
  );
}

export default App;

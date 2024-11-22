import "./config/connection"
import Layout from "./components/Layout";
import CreateProposal from "./components/CreateProposal";
import Proposals from "./components/Proposals";
import { useAppKitAccount } from "@reown/appkit/react";


function App() {
  // const { address, isConnected } = useAppKitAccount();

  // console.log(address, isConnected);
  return (
    <>
      <Layout>
        <CreateProposal />
        <Proposals />
      </Layout>
    </>
  );
}

export default App;

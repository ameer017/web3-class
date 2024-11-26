import "./config/connection";
import Layout from "./component/Layout";
import CreateFaucet from "./component/CreateFaucet";
import Faucets from "./component/Faucets";

function App() {
  return (
    <>
      <Layout>
        <CreateFaucet />
        <Faucets />
      </Layout>
    </>
  );
}

export default App;

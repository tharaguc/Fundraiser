import React, { useState, useEffect } from "react";
import FundraiserFactoryContract from "./contracts/FundraiserFactory.json"
import getWeb3 from "./utils/getWeb3";

const App = () => {
  const [state, setState] = useState({ web3: null, accounts: null, contract: null });
  
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FundraiserFactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FundraiserFactoryContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, accounts, contract: instance });
      } catch(err) {
        alert("App.js: failed to load web3");
        console.error(err);
      }
    }
    init();
  }, []);

  const runExample = async () => {
    const { accounts, contract } = state;
  }

  return (
    <div>
      <h1>Fundraiser</h1>
    </div>
  );
}

export default App;

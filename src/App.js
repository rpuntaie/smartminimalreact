import logo from './logo.svg';
import './App.css';

// this produces errors
// import Web3 from "web3"
import Web3 from "../node_modules/web3/dist/web3.min.js";
import smartcontract from './contracts/smartcontract.json'

import { useState, useEffect, useRef } from 'react';

function App() {

  const web3 = useRef();
  const contract = useRef();
  const [n, setn] = useState(0);

  useEffect(() => {
    const setup = async ()=>{
      var provider = null;
      if (window.ethereum && window.ethereum.isMetaMask)
          provider = window.ethereum;
      else
          provider = new Web3.providers.HttpProvider("http://localhost:8545");
      web3.current = new Web3(provider);
      contract.current = await new web3.current.eth.Contract(
        smartcontract.abi,
        "0x9982D7F33C900EbF89719fC18Aff2818C859e97c" // todo: change this address
      );
    };
    setup();
  }, []);

  async function PrintNumber() {
      setn(-1);
      setn(await contract.current.methods.n().call());
  }

  async function ChangeNumber() {
      const value = Math.floor(Math.random() * 100);
      setn(-2);
      const accounts = await web3.current.eth.getAccounts();
      await contract.current.methods.setn(value).send({ from: accounts[0] });
      setn(value);
  }

  function Status() {
    var status;
    if (n===-1)
      status = "fetching ...";
    else if (n===-2)
      status = "updating ...";
    else
      status = `number ${n.toString()}`;
    return (
      <p>
        Status: <span id="status">{status}</span>
      </p>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={PrintNumber}>Print Number</button>
        <button onClick={ChangeNumber}>Change Number</button>
        <Status/>

      </header>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import smartcontract from './contracts/smartcontract.json'

import { useState, useRef } from 'react';

import { Helmet, HelmetProvider } from "react-helmet-async"
const helmetContext = {};

function App() {

  const web3 = useRef();
  const contract = useRef();
  const [n, setn] = useState(0);

  function getWeb3() {
      if (web3.current === undefined)
          web3.current = new window.Web3(window.ethereum || "http://localhost:8545");
      return web3.current;
  }

  async function getContract() {
    if (contract.current === undefined) {
      const web3 = getWeb3();
      contract.current = await new web3.eth.Contract(
        smartcontract.abi,
        "0x1d1Ce6B37606AfecCA257F25262211fB2C4C1eFA" // todo: change this address
      );
    }
    return contract.current;
  };

  async function PrintNumber() {
      setn(-1);
      const c  = await getContract();
      setn(await c.methods.n().call());
  }

  async function ChangeNumber() {
      const value = Math.floor(Math.random() * 100);
      setn(-2);
      const accounts = await getWeb3().eth.getAccounts();
      const c  = await getContract();
      await c.methods.setn(value).send({ from: accounts[0] });
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

  return (<HelmetProvider context={helmetContext}>
    <Helmet>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"/>
    </Helmet>
    <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={PrintNumber}>Print Number</button>
        <button onClick={ChangeNumber}>Change Number</button>
        <Status/>
      </header>
    </div>
  </HelmetProvider>);
}

export default App;

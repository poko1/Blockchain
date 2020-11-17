import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import ipfs from './ipfs'

import "./App.css";
//global.pbK=pbK;
class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, buffer: null, ipfsHash: "" };


  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods. , buffer, ipfsHash
      this.setState({ web3, accounts, contract: instance});
      this.getHash=this.getHash.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.Decrypt=this.Decrypt.bind(this);
      this.onGet=this.getImage.bind(this);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getHash = async () => {
    const { accounts, contract, ipfsHash } = this.state;
    global.c = await contract.methods.get().call();
    this.setState({ ipfsHash: response });
    console.log('ipfsHash encrypted :',global.c);
  };


  getImage= async(event)=>{
  const { accounts, contract, ipfsHash } = this.state;
  this.setState({ipfsHash: global.d})
  console.log('ipfsHash', global.d)
  }

Decrypt= async (event) =>{
const EthCrypto = require("eth-crypto")
const decrypted = await EthCrypto.decryptWithPrivateKey(
        //prKey, // privateKey
         global.prK,
        {
            ciphertext: global.c,
        } // encrypted-data
    );

global.d=decrypted;
console.log("ipfsHash: ",global.d);
}

  handleChange= async (event) =>{
    this.setState({value: event.target.value});
  }

  handleSubmit= async (event) =>{
    global.prK= this.state.value;
    console.log(global.prK);
    event.preventDefault();
  }



  render() {

    return (
      <div className="App">
       <nav className="navbar pure-menu pure-menu-horizontal">
       </nav> 

       <main className="container">
       <div className="pure-g">
       <div className="pure-u-1-1">
        <p>Store Image on IPFS & The Ethereum Blockchain!</p>
        <h1>Get Encrypted Hash</h1>
        <button onClick={this.getHash}>Get Hash</button>
        <h2>Enter Your Private Key</h2>
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <p>
        <button onClick={this.Decrypt}>Decrypt</button>
        </p>
        <button onClick={this.getImage}>

        <input type="submit" value="Get Image" />
        <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
        </button>
       </div>
       </div>
       </main>
       </div> 
       
    );
  }
}

export default App;

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

      //const buffer= null;
      //const ipfsHash="";

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
      this.captureFile=this.captureFile.bind(this);
      this.onSubmit=this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.Encrypt=this.Encrypt.bind(this);
      this.onSend=this.onSend.bind(this);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract, ipfsHash } = this.state;
    //const web3 = await getWeb3();
    // Stores a given value, 5 by default.
    //await contract.methods.set(web3.utils.utf8ToHex("5")).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ ipfsHash: response });

  };


  captureFile= async (event) =>{
    console.log('capture file...')
     event.preventDefault()
     const file = event.target.files[0]
     const reader= new window.FileReader()
     reader.readAsArrayBuffer(file)
     reader.onloadend = () => {
      this.setState({buffer:Buffer(reader.result)})
      console.log('buffer',this.state.buffer)
     }
  }

  onSubmit= async (event) =>{
    event.preventDefault()
    ipfs.files.add(this.state.buffer,(error,result) =>{
      console.log(error,result)
      if(error){
        console.error(error)
        return
      }
      
global.r=result[0].hash
console.log('ipfsHash: ',global.r);
    })
  }

  onSend= async(event)=>{
  const { accounts, contract, ipfsHash } = this.state;
  contract.methods.set(global.c).send({from:accounts[0]})
  this.setState({ipfsHash: global.c})
  console.log('ipfsHash', global.c)

  }

 Encrypt= async (event) =>{
console.log('baaaaaaaaaal')
const EthCrypto = require("eth-crypto")
console.log('pbK :',global.pbK)
const encrypted = await EthCrypto.encryptWithPublicKey(
        global.pbK,
        global.r  
        //'message'
    );
console.log(encrypted)
global.c=encrypted.ciphertext
//global.i=encrypted.iv
//global.m=encrypted.mac
//global.e=ephemPublicKey
}

  handleChange= async (event) =>{
    this.setState({value: event.target.value});
  }

  handleSubmit= async (event) =>{
    global.pbK= this.state.value;
    console.log(global.pbK);
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
        <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
        <h1>Upload Image</h1>
        <form onSubmit={this.onSubmit} >
        <input type='file' onChange={this.captureFile}/>
        <input type='submit'/>
        </form>
        <h2>Enter Public Key of Receipient</h2>
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <p>
        <button onClick={this.Encrypt}>Encrypt</button>
        </p>
        <button onClick={this.onSend}>Send</button>

       </div>
       </div>
       </main>
       </div> 
       
    );
  }
}

export default App;

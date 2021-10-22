import React, { useState, useEffect } from "react"
import PiggyBankFactory from "./contracts/PiggyBankFactory.json";
import PiggyBank from "./contracts/PiggyBank.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App()  {
  const [storageValue, setStorageValue] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);  
  const [bankContract, setBContract] = useState(undefined);
  const [factoryContract, setFContract] = useState(undefined);

  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = PiggyBankFactory.networks[networkId];
        const deployedNetwork2 = PiggyBank.networks[networkId];

        const factoryContract = new web3.eth.Contract(
          PiggyBankFactory.abi,
          deployedNetwork && deployedNetwork.address,
        );

        const bankContract = new web3.eth.Contract(
          PiggyBank.abi,
          deployedNetwork2 && deployedNetwork2.address,
        );


  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3)
        setAccounts(accounts)        
        setBContract(bankContract)
        setFContract(factoryContract)
        
        
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        //console.error(error);
      }
    }
    init();
  }, []);

  useEffect(() => {
    const load = async () => {      
      const QtyAccounts = await factoryContract.methods.getContador().call();
      console.log(await QtyAccounts)


      // Get the value from the contract to prove it worked.
      //const response = await contract.methods.get().call();
      //GetQtyAccounts()

      IncreaseContador()

      console.log(await QtyAccounts)
      // Update state with the result.
      setStorageValue(QtyAccounts);
      
    }
      if(typeof web3 !== 'undefined'
          && typeof accounts !== 'undefined'
          && typeof bankContract !== 'undefined'
          && typeof factoryContract !== 'undefined'){            
            load();
          }
  }, [web3, accounts, bankContract, factoryContract]);

  async function GetQtyAccounts(){
    const qty = await factoryContract.methods.getPiggyQtyAccounts().call();
    console.log("la cantidad es " + await qty)
  }

  async function CreatePiggyAccount(){
    await factoryContract.methods.createPiggyBank().send({from: accounts[0]})
      .once('receipt', (receipt) => {
        console.log(receipt)
      })
      .on('confirmation', (condNumber, receipt, latestBlockHash) => {
        console.log(condNumber)
      })
      .on('error', (error) => {
        console.log(error)
      });    
  }

  async function IncreaseContador(){
    await factoryContract.methods.setContador().send({from: accounts[0]})
      .once('receipt', (receipt) => {
        console.log(receipt)
      })
      .on('confirmation', (condNumber, receipt, latestBlockHash) => {
        console.log(condNumber)
      })
      .on('error', (error) => {
        console.log(error)
      });    
  }

  if(typeof web3 === 'undefined'){
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show
        a stored value of 5 (by default).
      </p>
      <p>
        Try changing the value stored on <strong>line 42</strong> of App.js.
      </p>
      <div>The stored value is: {storageValue}</div>


    </div>
  );

}

export default App;

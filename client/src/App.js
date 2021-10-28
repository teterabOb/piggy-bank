import React, { useState, useEffect } from "react"
import PiggyBankFactory from "./contracts/PiggyBankFactory.json";
import PiggyBank from "./contracts/PiggyBank.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import PiggyContext from "./PiggyContext";
import AccountsComponents from "./AccountsComponent";

function App()  {
  const [storageValue, setStorageValue] = useState(undefined);
  const [piggyAccounts, setPiggyAccounts] = useState([]);
  const [qtyAccounts, setQtyAccounts] = useState(0);
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
      GetQtyAccounts();
      GetPiggyAccounts()
      
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
    setQtyAccounts(qty)
    return qty;
  }

  async function CreatePiggyAccount(){
    GetPiggyAccounts()
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

  async function GetPiggyAccounts(){
    let qty = await GetQtyAccounts()    
    console.log(await qty)

    for (let i = 1; i < qty; i++) {
      const piggy = await factoryContract.methods.getPiggyBankAddress(i).call()
      const piggyBalance = await web3.eth.getBalance(piggy)
      console.log(piggyBalance)
      console.log(piggy)
      
    }

  }

  if(typeof web3 === 'undefined'){
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <PiggyContext.Provider value={{web3, accounts, factoryContract, bankContract}} >
        <h1>Piggy Bank</h1>
        
        <h2>Smart Contract Example</h2>

        <div>La cantidasd de cuentas creadas es: {qtyAccounts}</div>
        <AccountsComponents />
        <div className="container">
    
          <button className="btn btn-success" onClick={() => CreatePiggyAccount()}>Crear Cuenta</button>
        </div>
      </PiggyContext.Provider>
    </div>
  );

}

export default App;

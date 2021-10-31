import React, { useState, useEffect } from "react"
import PiggyBankFactory from "./contracts/PiggyBankFactory.json";
import PiggyBank from "./contracts/PiggyBank.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import PiggyContext from "./PiggyContext";
import AccountsComponents from "./AccountsComponent";
import ContactoComponents from "./ContactoComponent";

function App()  {  
  const [qtyAccounts, setQtyAccounts] = useState(0);  
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);  
  const [bankContract, setBContract] = useState(undefined);
  const [factoryContract, setFContract] = useState(undefined);
  const [piggyAccounts, setPiggyAccounts] = useState([]);

  useEffect(() => {
    const init = async() => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();          
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
    const load = async() => {        
      const qty = await factoryContract.methods.getPiggyQtyAccounts().call();            
      setQtyAccounts(qty) 
   
      let piggyAccountsWithAmount = []

    
      for (let i = 1; i <= qty; i++) {
        const piggy = await factoryContract.methods.getPiggyBankAddress(i).call()
        const piggyBalance = await web3.eth.getBalance(piggy)   
        
        var jparse = JSON.stringify(PiggyBank.abi)   
        var contract = new web3.eth.Contract(JSON.parse(jparse), piggy)

        const owner = await contract.methods.owner().call()  
        piggyAccountsWithAmount.push({address: piggy, balance: piggyBalance, owner: owner})   

      }
               
      setPiggyAccounts(piggyAccountsWithAmount)     
      
    }
      if(typeof web3 !== 'undefined'
          && typeof accounts !== 'undefined'
          && typeof bankContract !== 'undefined'
          && typeof factoryContract !== 'undefined'){            
            load();
            
          }
  }, [web3, accounts, bankContract, factoryContract]);

  async function CreatePiggyAccount(){
    await factoryContract.methods.createPiggyBank().send({from: accounts[0]})
      .once('receipt', (receipt) => {
        
      })
      .on('confirmation', (condNumber, receipt, latestBlockHash) => {
        
      })
      .on('error', (error) => {
        
      });    
  }

  async function SendEtherToContract(contractAddress, amount){
    let amountString = (amount).toString()
    web3.eth.sendTransaction({from: accounts[0], to: contractAddress, value: web3.utils.toWei(amountString, 'ether')  });
  }

  async function WithDrawEther(address){    
    var jparse = JSON.stringify(PiggyBank.abi)   
    var contract = new web3.eth.Contract(JSON.parse(jparse), address)

    contract.methods.withDraw().send({from: accounts[0]})
  }

  function Botones(item){
    if(item.owner === accounts[0]){
      return( 
   
        <div>
          <button className="btn btn-success m-2" onClick={() => SendEtherToContract(item.address, 1)}>Depositar</button>                
          <button className="btn btn-warning m-2 text-white" onClick={() => WithDrawEther(item.address)}>Retirar</button>
        </div>)
    }else{
      return( 
   
        <div>
          <button className="btn btn-success m-2" onClick={() => SendEtherToContract(item.address, 1)}>Depositar</button>                          
        </div>)
    }

  }

  if(typeof web3 === 'undefined' ){
   
    return <div>Loading Web3, accounts, and contract...</div>;
  }
   
    return (
      <div className="App">

        <PiggyContext.Provider value={{web3, accounts, factoryContract, bankContract}} >
          <h1>Piggy Bank</h1>
                                         
         <div className="row">
            {piggyAccounts.map((item, i) => {              
              return (
                <div className="col-lg-4 p-2 m-5" key={i}>
                  <ul><strong>Address</strong>: {item.address}</ul>
                  <ul><strong>Owner</strong>: {item.owner}</ul>
                  <ul><strong>Balance</strong>: {web3.utils.fromWei(item.balance,'ether')} Ether</ul>
                  <input type="number" className="form-control" placeholder="ETH"/>
                {Botones(item)}
                </div>
              )
            
            })}  
          </div>
      
          <AccountsComponents />
          <div className="container">
      
            <button className="btn btn-success" onClick={() => CreatePiggyAccount()}>Crear Cuenta</button>
          </div>
  
        </PiggyContext.Provider>
      </div>
    )  
}

export default App;

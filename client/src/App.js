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
  const [etherToDeposit, setEtherToDeposit] = useState(0);

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
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
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
          <button className="btn btn-warning m-2 text-white" onClick={() => WithDrawEther(item.address)}>Retirar Fondos</button>
        </div>)
    }
  }

  if(typeof web3 === 'undefined' ){
   
    return <div>Loading Web3, accounts, and contract...</div>;
  }
   
    return (
      <div className="App">

        <PiggyContext.Provider value={{web3, accounts, factoryContract, bankContract}} >
          
          <div className="container py-2">   
            <h1 className="mx-2">Piggy Bank</h1>   
            <button className="btn btn-success mx-5" onClick={() => CreatePiggyAccount()}>Crear Cuenta</button>
          </div>                 
         <div className="">
           <div className="d-flex align-items-center">           
            {piggyAccounts.map((item, i) => {              
              return (
                <div className="border m-2 p-2" key={i}>
                  <form id={"formCuenta"+ i}>
                  <div className="form-group">
                    <label><strong>Address</strong>: {item.address}</label> 
                  </div>
                  <div className="form-group">
                    <label><strong>Owner</strong>: {item.owner}</label>
                  </div>
                  <div className="form-group">
                    <label><strong>Balance Cuenta</strong>: {web3.utils.fromWei(item.balance,'ether')} Ether</label>
                  </div>                                                                            
                {Botones(item)}
                </form>
                </div>
                )            
              })} 
            </div> 
          </div>
          <div className="d-flex">
            <div className="col-lg-4 m-2">
            <AccountsComponents />
            </div>
            <div className="col-lg-4 m-2">
            <ContactoComponents />  
            </div>      
          
          </div>

        </PiggyContext.Provider>
      </div>
    )  
}

export default App;

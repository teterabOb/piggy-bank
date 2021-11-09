import React, { useContext } from 'react'
import PiggyContext from './PiggyContext'


export default function AccountsComponents(){
    const piggyContext = useContext(PiggyContext);
    const { web3, accounts, factoryContract, bankContract } = piggyContext;

    const  onSubmit = (form) => {    
        form.preventDefault();
        let cuenta = form.target.txtCuenta.value 
        let monto = form.target.txtMonto.value
        
        if((web3.utils.isAddress(cuenta)) && monto > 0){
            let amountString = (monto).toString()
            web3.eth.sendTransaction({from: accounts[0], to: cuenta, value: web3.utils.toWei(amountString, 'ether')  });
        }else{
            alert("El address debe ser válido y el monto debe ser mayor a cero ...")
        }
    }
     
return (
        <div className="col-lg-12 d-flex justify-content-center m-5 p-2 border">            
            <form onSubmit={onSubmit}>
            <h1>Depositar</h1>
            <div className="form-group">
                <label>Número de Cuenta Piggy Bank</label>
                <input type="text" className="form-control" name="txtCuenta" id="txtCuenta" placeholder="Cuenta" />            
            </div>
            <div className="form-group">
                <label>Monto a Depositar</label>
                <input type="text" className="form-control" name="txtMonto" id="txtMonto" placeholder="Monto" />
            </div>
            <button type="submit" className="btn btn-primary m-2">Depositar</button>            
            </form>
        </div>
    )

}
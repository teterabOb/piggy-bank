import React, { useContext } from 'react'
import PiggyContext from './PiggyContext'

export default function AccountsComponents(){


    const piggyContext = useContext(PiggyContext);
    const { web3, accounts, factoryContract, bankContract } = piggyContext;
  
   
return (
        <div className="col-lg-12 d-flex justify-content-center m-5 p-2 border">
            <form>
            <div className="form-group">
                <label>Número de Cuenta Piggy Bank</label>
                <input type="text" className="form-control" id="txtCuenta" placeholder="Cuenta" />            
            </div>
            <div className="form-group">
                <label>Monto a Depositar</label>
                <input type="text" className="form-control" id="txtMonto" placeholder="Monto" />
            </div>
            <button type="submit" className="btn btn-primary m-2">Depositar</button>
            <button type="submit" className="btn btn-warning m-2">Retirar</button>
            </form>
        </div>
    )

}
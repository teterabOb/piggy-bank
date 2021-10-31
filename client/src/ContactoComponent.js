import React, { useContext } from 'react'
import PiggyContext from './PiggyContext'

export default function ContactoComponents(){


    const piggyContext = useContext(PiggyContext);
    const { web3, accounts, factoryContract, bankContract } = piggyContext;
  
   
return (
        <div className="container d-flex justify-content-center m-5 p-2 border">
            <form>
            <div className="form-group">
                <label>Nombre</label>
                <input type="text" className="form-control" id="txtNombre" placeholder="Nombre" value=""/>            
            </div>
            <div className="form-group">
                <label>E-mail</label>
                <input type="text" className="form-control" id="txtEmail" placeholder="E-mail" />
            </div>
            <div className="form-group">
                <label>Mensaje</label>
                <input type="text" className="form-control" id="txtMensaje" placeholder="Mensaje" />
            </div>
            <button type="submit" className="btn btn-primary m-2">Enviar Consulta</button>            
            </form>
        </div>
    )

}
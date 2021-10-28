import React, { useContext } from 'react'
import PiggyContext from './PiggyContext'

export default function AccountsComponents(){
    const piggyContext = useContext(PiggyContext);
    const { web3, accounts, factoryContract, bankContract } = piggyContext;

   
return <p>Hola Mundo desde el component</p>
 
}
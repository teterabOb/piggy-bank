import React, { useContext } from 'react'
import PiggyContext from './PiggyContext'
import { useForm } from "react-hook-form"

export default function ContactoComponents(){
    const piggyContext = useContext(PiggyContext);
    const { web3, accounts, factoryContract } = piggyContext;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
        
    const onSubmit = async (data) => {
        var mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var res =  (data.Email).match(mail_format)

  
            
            var url = "https://us-central1-piggybank-ece2a.cloudfunctions.net/mailer";
                        
            let headers = new Headers()
            headers.append("Accept", "application/json")
            headers.append("Content-Type", "application/json")

            var data = {
                to: data.Email,
                message: data.Mensaje,
                subject : "Contacto Piggy Bank"
            }

            let dataJson = JSON.stringify(data)            

            fetch(url, { mode: 'cors',            
                        method: 'POST',
                        headers: headers,
                        body: dataJson
                        })
                        .then(r => r.json())
                        .then(resp => { alert(resp.message) })
                        .catch(e => {alert("Ocurrió un error al enviar el correo")})
                        


    }
return (
        <div className="container d-flex justify-content-center m-5 p-2 border">
            <form onSubmit={handleSubmit(onSubmit)} name="formCorreo"> 
            <h1>Contacto</h1>
            <div className="form-group">
                <label>Nombre</label>
                <input {...register("Nombre", { required: true  })} type="text" className="form-control" id="txtNombre" placeholder="Nombre"/>   
                {errors.Nombre && errors.Nombre.type === "required" && <span className="text-danger">Nombre requerido</span>}         
            </div>
            <div className="form-group">
                <label>E-mail</label>
                <input {...register("Email", { required: true, pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/} })} type="text" className="form-control" id="txtEmail" placeholder="E-mail" />
                {errors.Email && errors.Email.type === "required" && <span className="text-danger">Email requerido</span>}         
            </div>
            <div className="form-group">
                <label>Mensaje</label>
                <input {...register("Mensaje", { required: true  })}type="text" className="form-control" id="txtMensaje" placeholder="Mensaje" />
                {errors.Mensaje && errors.Mensaje.type === "required" && <span className="text-danger">Mensaje requerido</span>}                         
            </div>
                <input type="submit" className="btn btn-primary m-2" value="Enviar Consulta"/>            
            </form>
        </div>
    )

}
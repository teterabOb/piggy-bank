import React, { useContext } from 'react'
import PiggyContext from './PiggyContext'
import { useForm } from "react-hook-form"

export default function ContactoComponents(){
    const piggyContext = useContext(PiggyContext);
    const { web3, accounts, factoryContract, bankContract } = piggyContext;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        var mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var res =  (data.Email).match(mail_format)

        if(res){
            
            var url = "https://us-central1-piggybank-ece2a.cloudfunctions.net/mailer";
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url)

            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log("status: " + xhr.status);
                console.log("resp text: " + xhr.responseText);
            }};

            var data = `{
                "to": ${data.Email},
                "message": ${data.Mensaje},
                "subject": "Piggy Bank Content"
            }`

            xhr.send(data)


        }else{
            alert("mail NO! valido")
        }
    }
return (
        <div className="container d-flex justify-content-center m-5 p-2 border">
            <form onSubmit={handleSubmit(onSubmit)} name="formCorreo"> 
            <h1>Contacto</h1>
            <div className="form-group">
                <label>Nombre</label>
                <input {...register("Nombre", { required: true  })} type="text" className="form-control" id="txtNombre" placeholder="Nombre"/>            
            </div>
            <div className="form-group">
                <label>E-mail</label>
                <input {...register("Email", { required: true  })} type="text" className="form-control" id="txtEmail" placeholder="E-mail" />
            </div>
            <div className="form-group">
                <label>Mensaje</label>
                <input {...register("Mensaje", { required: true  })}type="text" className="form-control" id="txtMensaje" placeholder="Mensaje" />
                {errors.exampleRequired && <span>This field is required</span>}
            </div>
                <input type="submit" className="btn btn-primary m-2" value="Enviar Consulta"/>            
            </form>
        </div>
    )

}
import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Footer from "./footer/Footer";
import LogIn from "./login/Login";
import {recuperarPass} from "../controller/miApp.controller";


export default function MailContra() {
  // React States
  const [errorBack,setErrorBack] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    pass1: "Debe tener al menos 8 caracteres",
    pass2: "Las contraseñas deben ser iguales"
  };

  const cambiarPass = async function(email,mascota){
    let datos = {
      email: email,
      mascota: mascota,
    }
    let getUpdatePass = await recuperarPass(datos);
    if (getUpdatePass.rdo===0 ){
      setIsSubmitted(true);
    }
    if (getUpdatePass.rdo===1){
      setErrorBack(getUpdatePass.mensaje);
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    setErrorBack("");

    var { uname, pet } = document.forms[0];
    cambiarPass(uname.value,pet.value);
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Mail </label>
          <input type="text" name="uname" required />
        </div>

        <div className="input-container">
          <label>Nombre Mascota</label>
          <input type="text" name="pet" required />
        </div>

        <div className="input-container">
          <div className="error">
            {errorBack}
          </div>
        </div>

        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  const redirect= ()=>{
    if(localStorage.getItem("mail")){
      window.location.href='/'
    }
  }   

  const render = (
            <div onLoad={redirect()}>
                <h4>Una nueva contraseña ha sido enviada a su email</h4>
                    <Box textAlign='center'>
                        <Button variant='contained' color="primary" style={{marginTop:"15px"}}
                          onClick={()=> window.location.href='/'}>
                            Aceptar
                        </Button>
                    </Box>
            </div>
  );

  return (
    <div className="app" style={{minHeight: '100vh',
    backgroundColor:"#FFE3CC",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'} }>
      <div className="formulario">
        <div className="title">Recuperar Contraseña</div>
        {isSubmitted || localStorage.getItem("mail") ? render : renderForm}
      </div>
      <Footer/>
    </div>
  );
}
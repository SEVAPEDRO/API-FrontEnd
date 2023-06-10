import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Footer from "./footer/Footer";
import LogIn from "./login/Login";
import {updatePass} from "../controller/miApp.controller";


export default function RecuperoContra() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [errorBack,setErrorBack] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    pass1: "Debe tener al menos 8 caracteres",
    pass2: "Las contraseñas deben ser iguales"
  };

  const cambiarPass = async function(email,mascota,password){
    let datos = {
      email: email,
      mascota: mascota,
      password:password
    }
    let getUpdatePass = await updatePass(datos);
    if (getUpdatePass.rdo===0 ){
      localStorage.removeItem("mail");
      localStorage.removeItem("x");
      setIsSubmitted(true);
    }
    if (getUpdatePass.rdo===1){
      setErrorBack(getUpdatePass.mensaje);
    }
}

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    setErrorMessages({});
    setErrorBack("");

    var { uname, pet, pass1, pass2 } = document.forms[0];

    if (pass1.value.length <8) {
      // Invalid password
      setErrorMessages({ name: "pass1", message: errors.pass1 });
    } else {               
      if(pass1.value !== pass2.value){
        setErrorMessages({ name: "pass2", message: errors.pass2 });
      }else{
        
        cambiarPass(uname.value,pet.value,pass1.value);
      }
    }

    
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

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
          <label>Nueva Contraseña </label>
          <input type="password" name="pass1" required />
          {renderErrorMessage("pass1")}
        </div>

        <div className="input-container">
          <label>Repetir Contraseña </label>
          <input type="password" name="pass2" required />
          {renderErrorMessage("pass2")}
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
    if(isSubmitted){
      window.location.href='/'
    }
  }    

  const render = (
    <div onLoad={redirect()}>Contraseña modificada con exito!!! <br></br>
           </div>
  );

  return (
    <div className="app" style={{minHeight: '100vh',
    backgroundColor:"#FFE3CC",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'} }>
      <div className="formulario">
        <div className="title">Cambio de Contraseña</div>
        {isSubmitted ? render : renderForm}
      </div>
      <Footer/>
    </div>
  );
}
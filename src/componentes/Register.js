import { Box, Button } from "@material-ui/core";
import React, { useState} from "react";
import ReactDOM from "react-dom";
import {Redirect} from "react-router-dom";
import Login from "./login/Login";
import {registration} from "../controller/miApp.controller";
import Footer from "./footer/Footer";

export default function Register() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorBack, setErrorBack] = useState("");
  
  const errors = {
    pass: "Debe tener al menos 8 caracteres",
  };

  const validarRegistro = async function(email,password,name,mascota,telefono){
    let datos = {
      email: email,
      password:password,
      name:name,
      mascota:mascota,
      telefono:telefono
    }
    let regisInfo = await registration(datos);
    console.log(regisInfo.mensaje)
    if (regisInfo.rdo===0 ){
      setIsSubmitted(true);
    }
    if (regisInfo.rdo===1){
      setErrorBack(regisInfo.mensaje);
    }
}
 
  const handleSubmit = (event) => {
    setErrorBack("")
    //Prevent page reload
    event.preventDefault();
    var { uname, pass, nomPas, pet, tel } = document.forms[0];

    // Compare user info
    if (pass.value.length <8) {
      // Invalid password
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      //Aquí se ingresaría a database
      setErrorMessages({});
      validarRegistro(uname.value,pass.value,nomPas.value,pet.value,tel.value);
    }
    
   
  };
  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
 
  const referencia = React.createRef(null);
  const lectura = () => {
    referencia.current.innerHTML = "Para recuperación de Contraseña"
  };
  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Mail </label>
          <input type="email" className="stext" name="uname" required />
          <div className="error">
            {errorBack}
          </div>
        </div>
        <div className="input-container">
          <label>Contraseña </label>
          <input type="password" className="stext" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Nombre y Apellido </label>
          <input type="text" className="stext" name="nomPas" required />
        </div>
        <div className="input-container">
          <label>Telefono </label>
          <input type="number" className="stext" name="tel" required />
        </div>
        <div className="input-container">
          <label>Nombre Mascota</label>
          <input type="text" className="stext" name="pet" required onChange={lectura} />
          <div className="mensPet" ref={referencia} ></div>
        </div>
        <div className="button-container">
          <input type="submit" />
         
        </div>
      </form>
    </div>
  );

  const redirect= ()=>{
    if(isSubmitted || localStorage.getItem("mail")){
      window.location.href='/'
    }
  }    

  const render = (
    <div onLoad={redirect()}>Se ha registrado con exito!!! <br></br>
           </div>
  );  

  return (
    <div className="app"  
      style={{minHeight: '100vh',
      backgroundColor:"#D3FF70",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'} }>
      <div className="formulario">
        <div className="title">Register</div>
        {isSubmitted || localStorage.getItem("mail") ? render : renderForm}
      </div>
      <Footer/>
    </div>
  );
}
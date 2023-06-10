import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import Footer from "../footer/Footer";

import "./login.css";
import {login} from "../../controller/miApp.controller";

export default function Login(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validarLogin = async function(email,password){
      let datos = {
        email: email,
        password:password
      }
      let getLogin = await login(datos);
      if (getLogin.rdo===0 ){
        setIsSubmitted(true);
      }
      if (getLogin.rdo===1){
        setErrorMessages(getLogin.mensaje);
      }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    if (uname.value!=="" && pass.value!==""){
      validarLogin(uname.value,pass.value);
    }
    else{
      alert("Debe completar usuario y password");
    }
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input className="stext" type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Contraseña </label>
          <input className="stext" type="password" name="pass" required />
          <div className="error">
            {errorMessages}
          </div>
        </div>


        <div className="button-container">
          <input type="submit" />
        </div>

        <Box textAlign='center'>
              <Button variant='contained' color="primary" style={{marginTop:"15px"}} 
              onClick={()=> window.location.href='/mailContrasena'}>
                Me olvide la contraseña
              </Button>
        </Box>

        
      </form>
    </div>
  );

  const redirect= ()=>{
    if(isSubmitted || localStorage.getItem("mail")){
      window.location.href='/'
    }
  }    

  const render = (
    <div onLoad={redirect()}>Has ingresado con exito!!! <br></br>
           </div>
  );       

  return (

    <>
   
      <div className="app" 
          style={{minHeight: '100vh',
          backgroundColor:"#F59BDA",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'} }>
          <div className="formulario">
            <div className="title">Ingresar</div>
            {isSubmitted || localStorage.getItem("mail") ? render : renderForm}
          </div>
          <Footer/>
      </div>
    </>
  );
}
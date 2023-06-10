import React, { useState } from "react";
import ReactDOM from "react-dom";
import LogIn from "./login/Login";

//import "C:/Users/Pedro/Downloads/UADE/API/reactPruebas/reactprueba1/src/styles/styles.css";
//buscar usuario en el lugar de database y dps llamar al metodo de modificar

export default function ModificarUsuario() {
  // React States
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "jesus@gmail.com",
      nombreApellido: "Jesus Pimienta",
      password: "pass1",
      pet: "coco"
    },
    {
      username: "principe@hotmail.com",     
      nombreApellido: "Enzo Francescoli",
      password: "pass2",
      pet: "limon"
    }
  ];

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    //Aquí se haría update en Database
    setIsSubmitted(true);
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>

        <div className="input-container">
          <label>Nombre y Apellido </label>
          <input type="text" className="stext" name="nomPas" 
          placeholder={database[0].nombreApellido} required />
        </div>

        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="formulario">
        <div className="title">Cambio de nombre</div>
        {isSubmitted ? <div>Nombre y apellido modificados con exito! </div> : renderForm}
      </div>
    </div>
  );
}
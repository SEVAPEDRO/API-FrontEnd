import React, { useState, useEffect} from "react";
import Slider from '@material-ui/core/Slider';
import "./altaRecetaStyles.css"
import { Box, Button } from "@material-ui/core";
import {altaReceta, uploadFileImg} from '../../controller/miApp.controller.js'
import {guardarImgUser} from '../../controller/miApp.controller.js'
import Footer from "../footer/Footer";

export default function AltaReceta() {
  let filesEnviar=[];
  let nombres=[];
  let archivoImagen="";
  useEffect(() => {
    document.body.style.width="100%";

    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  const uploadImage= async e =>{
    const files = e.target.files;
    let aleatorio = Math.random().toString().substring(2,15);
    nombres.push(files[0].name)
    console.log(filesEnviar.length===0)
    filesEnviar.push(files[0])
    console.log(filesEnviar.length)
    archivoImagen = await uploadFileImg(files,nombres)
    console.log(filesEnviar[0])
  }

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const crearReceta= async function(titulo, categoria, ingredientes, procedimiento, dificultad){
    let datos={
      autor: localStorage.getItem('mail'),
      titulo: titulo,
      categoria: categoria,
      ingredientes: ingredientes,
      procedimiento: procedimiento,
      dificultad: dificultad
    }
   
    let respuesta= await altaReceta(datos);
    if (respuesta.rdo===2){
      alert("Debes estar logueado para crear recetas");
    }
    //console.log(respuesta.idr);
    let imgUser={
      email:localStorage.getItem('mail'),
      nombreImagen: nombres[0],
      idReceta: respuesta.idr,
    }
    let rdo = await guardarImgUser(imgUser);

    if (respuesta.rdo===0){
      setIsSubmitted(true);
    }
    if(respuesta.rdo===1){
      setErrorMessages(respuesta.mensaje);
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var{titulo, categoria, ingredientes, procedimiento, dificultad, imagenReceta}= document.forms[0];
    if (titulo==="" || categoria==="" || ingredientes==="" || procedimiento==="" || dificultad==="" || filesEnviar.length===0) {
      alert("No enviar información en blanco")
    }
    else{
      crearReceta(titulo.value, categoria.value, ingredientes.value, procedimiento.value, dificultad.value);
    }
    //setIsSubmitted(true);
  };

  const renderForm = (
      <form onSubmit={handleSubmit} className="formReceta">
        <div className="titulo">
          <h1>Nueva Receta</h1>
        </div>

        <div className="form-body">
          <div className="row">
              <div className="input-group">
                  <label>Titulo </label>
                  <input type="text" className="rtext" name="titulo" required />
              </div>
            <div className="input-group">
              <label>Categoría </label>
              <select required className="rtext" name="categoria">
                 <option>Pasta</option>
                 <option>Carnes</option>
                 <option>Postres</option>
                 <option>Sopa</option>
                 <option>Guiso</option>
                 <option>Pizza</option>
                 <option>Libre gluten</option>
                 <option>Pescados</option>
                 <option>Empanadas</option>
                 <option>Vegetariano</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <label>Ingredientes </label>
              <textarea className="rtext area" name="ingredientes" required></textarea>
            </div>

            <div className="input-group">
              <label>Procedimiento</label>
              <textarea className="rtext area" name="procedimiento" required></textarea>
            </div>
          </div>
          <div className="row">
            <div className="input-group">               
                <label>Dificultad</label>
                <Slider
                    defaultValue={3}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="auto"
                    max={5}
                    min={1}
                    name="dificultad"
                />
            </div>
            <div className="input-group">
              <label>Imágenes</label>
              <input className="rtext" type="file" name="imagenReceta" onChange={uploadImage} />
            </div>
          </div>
          <div className="input-group">
            <input type="submit" style={{backgroundColor: "blue"}} />
          </div>
        </div>
      </form>
  );

  return (
    <>    
          <div className="appReceta" style={
            {minHeight: '100vh',
            backgroundColor: "#F5839D",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            }}> 
              {isSubmitted ?
                  <div className="formReceta">
                    <div className="titulo">
                      <div>
                        <h1>Receta creada Con Exito</h1>
                        <Box textAlign='center'>
                          <Button variant='contained' color="primary" style={{marginTop:"15px"}}
                          onClick={()=> window.location.href='/'}>Aceptar</Button></Box>
                      </div>
                    </div>
                  </div>
               : renderForm}
              
          </div>
          
          
          
    </>

          
  );
}
import React, { useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import "./altaReceta/AltaReceta";
import { Box, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Footer from "./footer/Footer";
import { getRecetaById, updateReceta, updateUserImg, uploadFileImg } from "../controller/miApp.controller";


export default function ModificarReceta(props) {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
    
    // Hola Juanma en la variable id vas a encontrar el id de la receta que vas a levantar datos/modificar
    // Ahí tenes un console log para probarlo, fijate, es igual al id de la url (el cual a su vez es igual al de la receta)
    // Importante: No cambies el nombre de esta variable, ya que la misma está referenciada por el router en app.js
  const { id } = useParams();
  //console.log("Soy el id",id);

  let filesEnviar=[];
  let nombres=[];
  let archivoImagen="";
  const [valTitulo, setValTitulo] = useState("");
  const [valCategoria, setValCategoria] = useState("");
  const[valIngredientes, setValIngredientes]= useState("");
  const[valProcedimiento, setValProcedimiento]= useState("");
  const[valDificultad, setValDificultad]= useState(0);
  const [valImagen, setValImagen]= useState("");

  const handleChange =(event, newValue) =>{
    setValDificultad(newValue)
  }

  const uploadImage= async e =>{
    const files = e.target.files;
    nombres.push(files[0].name)
    filesEnviar.push(files[0])
    archivoImagen = await uploadFileImg(files,nombres)
    console.log(filesEnviar[0])
  }


  useEffect(() => {
    const fetchData = async () => {
      const receta = await getRecetaById(id);
      //const imagenRespuesta= await imgByIdReceta(id); //props.id
      //setRespuestaImagen(imagenRespuesta);
      //setValImagen(imagenRespuesta[0].nombreImagen);
      setValTitulo(receta.result.titulo);
      setValIngredientes(receta.result.ingredientes);
      setValProcedimiento(receta.result.procedimiento);
      setValCategoria(receta.result.categoria);
      setValDificultad(Number(receta.result.dificultad))
    };
    fetchData();
   },[localStorage.getItem("mail")]);

  
  const validarSubmit = async function(){
    let datos = {
      id: id,
      titulo: valTitulo,
      categoria: valCategoria,
      ingredientes: valIngredientes,
      dificultad: valDificultad.toString(),
      procedimiento:valProcedimiento,
    }
    let getUpdate = await updateReceta(datos);
   
    if(filesEnviar.length!==0){
      let imgUser={
        email:localStorage.getItem('mail'),
        nombreImagen: nombres[0],
        idReceta: id,
      }
      await updateUserImg(imgUser);
    }
    if (getUpdate.rdo===0){
      setIsSubmitted(true);
    }else if(getUpdate.rdo===2){
      alert("Debes estar logueado para modificar recetas")
    }
    else{
      alert("Error al actualizar la receta")
    }
  }

   const handleSubmit = (event) => {  
    //Prevent page reload
    event.preventDefault();
    if (valTitulo==="" || valProcedimiento==="" || valIngredientes===""){
      setErrorMessages("No enviar información en blanco")
    }
    else{
      validarSubmit();
    }
  };


  // JSX code for login form
  const renderForm = (
    
      <form onSubmit={handleSubmit} className="formReceta">
        <div className="titulo">
          <h1>{valTitulo}</h1>
        </div>

        <div className="form-body">
          <div className="row">
            <div className="input-group">
              <label>Nombre </label>
              <input type="text" className="rtext" required 
                 value={valTitulo} onChange={(e)=> setValTitulo(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Categoría </label>
              <select required className="rtext" value={valCategoria} onChange={(e)=> setValCategoria(e.target.value)}>
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
              <textarea className="rtext area" required
              value={valIngredientes} onChange={(e)=> setValIngredientes(e.target.value)}></textarea>
            </div>

            <div className="input-group">
              <label>Procedimiento</label>
              <textarea className="rtext area" required 
               value={valProcedimiento} onChange={(e)=> setValProcedimiento(e.target.value)}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="input-group">               
                <label>Dificultad</label>
                <Slider
                    value={valDificultad}
                    onChange={handleChange}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="auto"
                    max={5}
                    min={1}
                />
            </div>

            <div className="input-group">
              <label>Imágenes</label>
              <input className="rtext" type="file" name="imagenReceta" onChange={uploadImage} />
            </div>
          </div>

          <div className="input-group">
            <input type="submit" />
            
          </div>

        </div>
      </form>
  );

  return (
    <div>
      <div className="appReceta" style={
        {minHeight: '100vh',
        backgroundColor: "#B6AFD1",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        }}> 
          {isSubmitted ?
              <div className="formReceta">
                <div className="titulo">
                  <div>
                    <h1>Receta Modificada Con Exito</h1>
                    <Box textAlign='center'>
                      <Button variant='contained' color="primary" style={{marginTop:"15px"}}
                      onClick={()=> window.location.href='/'}>Aceptar</Button></Box>
                  </div>
                </div>
              </div>
          : renderForm}
      </div>
    </div>

  );
}
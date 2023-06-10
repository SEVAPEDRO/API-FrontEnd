import React, { useState} from "react";
import { useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import ReactDOM from "react-dom";
import Login from "./login/Login";
import { makeStyles } from '@material-ui/core/styles';
import {getUserByEmail} from "../controller/miApp.controller";
import {updatePerfil} from "../controller/miApp.controller";
import Footer from "./footer/Footer";

const useStyles=makeStyles((theme) =>({
    app: {
       
      },
}))
export default function Register() {
  // React States
  const classes = useStyles();
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const[data,setData] = useState({});
  const [valNombre, setValNombre] = useState("");
  const [valMascota, setValMascota] = useState("");
  const[valTel, setValTel]= useState("");


  useEffect(() => {
    const fetchData = async () => {
      const infoUser = await getUserByEmail(localStorage.getItem("mail"));
      if(infoUser.rdo===1){
        alert("Error inesperado");
      }else if(infoUser.rdo===2){
        alert("Debes estar logueado para usar esta pagina");
        window.location.href='/';
      }
      else{
        setData(infoUser.user);
        setValNombre(infoUser.user.name);
        setValMascota(infoUser.user.mascota);
        setValTel(infoUser.user.telefono);
        console.log(data.name)
      }
    };

    fetchData();
  },[localStorage.getItem("mail")]);

  const validarSubmit = async function(){
    let datos = {
      email: data.email,
      name: valNombre,
      mascota: valMascota,
      telefono: valTel
    }
    let getUpdate = await updatePerfil(datos);
    if (getUpdate.rdo===0 ){
      setIsSubmitted(true);
    }else{
      alert("Error al actualizar el perfil")
    }
  }

  const handleSubmit = (event) => {  
    //Prevent page reload
    event.preventDefault();

    if (valNombre==="" || valMascota==="" || valTel===""){
      setErrorMessages("No enviar información en blanco")
    }
    else{
      validarSubmit();
    }
  };
 
  // JSX code for login form
  const renderForm = (
    <form onSubmit={handleSubmit}>
        <div className="input-container" >
          <label >Mail </label>
          <input type="text" className="stext" name="uname" required
              value={data.email} />
        </div>
        <div className="input-container">
          <label>Nombre y Apellido </label>
          <input type="text" className="stext" name="nomPas" required
           value={valNombre} onChange={(e)=>setValNombre(e.target.value)}/>
        </div>
        <div className="input-container">
          <label>Telefono </label>
          <input type="text" className="stext" name="tel" required
           value={valTel} onChange={(e)=>setValTel(e.target.value)}/>
        </div>
        <div className="input-container">
          <label>Nombre de mascota </label>
          <input type="text" className="stext" name="nomMascota" required
           value={valMascota} onChange={(e)=>setValMascota(e.target.value)}/>
           <div className="error">
            {errorMessages}
          </div>
        </div>   
     
        <div className="button-container">
          <input type="submit" style={{backgroundColor: "blue"}} />      
        </div>

        <Box textAlign='center'>
              <Button variant='contained' color="primary" style={{marginTop:"15px"}} 
              onClick={()=> window.location.href='/olvideContrasena'}>
                Cambiar contraseña
              </Button>
        </Box>

      </form>
 
  );
  return (
    <div className="app" style={
        {minHeight: '100vh',
        backgroundColor:"#75FC53",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        }
    }>
      <div className="formulario">
        <div className="title">Perfil</div>
        {isSubmitted ? <div> <div>Perfil modificado con exito!!! <br></br>
           </div>
           <Box textAlign='center'>
              <Button variant='contained' color="primary" style={{marginTop:"15px"}} 
              onClick={()=> window.location.href='/'}>
                Aceptar
              </Button>
            </Box>
           </div> : renderForm}
      </div>
      <Footer/>
    </div>
  );
}
import React, { Component, useRef }  from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import PencilIcon from '@material-ui/icons/Create';
import { useEffect, useState } from "react";
import Slider from '@material-ui/core/Slider';
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

import {checkFav} from "../controller/miApp.controller";
import {getRecetaById} from "../controller/miApp.controller";
import {quitarFav} from "../controller/miApp.controller";
import {agregarFav} from "../controller/miApp.controller";
import {agregarCalificacion} from "../controller/miApp.controller";
import {imgByIdReceta} from '../controller/miApp.controller';
import {eliminarReceta} from '../controller/miApp.controller';

const useStyles = makeStyles({
    card: {
        maxWidth: 1200,
        boxSizing:"border-box",
        marginLeft: 40,
        paddingBottom: "35px",
    },
    cardBody:{
        pointerEvents: 'none',
    },
    row:{
        display: "flex",
        justifyContent:"space-between",
        marginBottom:10,
        "@media (max-width: 700px)": {
            flexDirection: "column",
        }
    },
    image:{
        maxWidth: 1200,
        height:400,
    },
    icono:{
        marginLeft: "auto",
    },
    slider:{
        maxWidth: 120,
    },
    creador:{
        marginLeft: "auto",
    },
    visita:{
        display: "flex",
        justifyContent:"space-between",
        marginBottom:10,
        width:"100%",
    },
    pop:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        backgroundColor: "white",
        border: '2px solid #000',
        boxShadow: "10px 5px 5px",
        padding: "2,3,4",
    },
  })


  export default function Receta(props) {
  const classes = useStyles();
  const { id } = useParams();

  //Estado Receta
  const [nombre,setNombre] = useState("");
  const [dificultad,setDificultad] = useState("");
  const [calificacion, setCalificacion] = useState();
  const [autor, setAutor] = useState("");
  const [procedimiento, setProcedimiento] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [imagen, setImagen]=useState("");
  
  //Estado PopUp
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {setOpen(false)};
  const [textPop, setTextPop] = React.useState("");
  const [titlePop, setTitlePop] = React.useState("");

  //Gestión Fav
  const [favColor, setFavColor] = useState("");
  const banFav = useRef(false);

  //Gestión Nuevos puntos
  const [puntosSlider,setPuntosSlider] = useState(3);

  useEffect(() => {
    const scroll = () =>{
        window.scrollTo(0, 0)
    }

    const getImagenReceta = async () =>{
        const imagenRespuesta= await imgByIdReceta(id);
        setImagen(imagenRespuesta[0].nombreImagen);
    }

    const getFav = async () =>{
        var datos = {
            email: localStorage.getItem("mail"),
            idr: id
        };
        var banderaFav = await checkFav(datos);
        if(banderaFav.rdo===1){
            alert("Error inesperado");
        }else{
            banFav.current = banderaFav.bandera;
            renderFav();
        }
    }

    const getRecetaInfo = async () =>{
        var receta = await getRecetaById(id);
        setNombre(receta.result.titulo);
        setDificultad(receta.result.dificultad);
        setAutor(receta.result.autor);
        setProcedimiento(receta.result.procedimiento);
        setIngredientes(receta.result.ingredientes);
        var calificacionExacta = receta.result.cantPuntos!==0 ? receta.result.puntos/receta.result.cantPuntos: 0;
        setCalificacion(calificacionExacta.toFixed(1));
        
        
    }

    scroll();
    getImagenReceta();
    getFav();
    getRecetaInfo();
  }, [localStorage.getItem("mail")]);

  const renderFav = () => {
    console.log("Soy banFav",banFav)
    var color = banFav.current ? "error" : "";
    setFavColor(color);
   };

  const gestionEliminar = async () =>{
    let datos = {
      idr: id,
      autor: autor
    };
    let getUpdate = await eliminarReceta(datos);
    if (getUpdate.rdo===0 ){
        
    }else{
        alert("Error al eliminar Receta")
    }
  }

  const eliminar = () =>{
    gestionEliminar()
    window.location.href='/';
  }

  const gestionarBin = () =>{
    setTitlePop("Eliminar Receta?");
    setOpen(true);
  };

  const toReceta = {
    pathname: `/modificarReceta/${id}`,
    state:{
      nombre: nombre,
    },
  };

  const renderCreador = (
    <div className={classes.creador}>
        <div >
            <Link to={toReceta}>
                <PencilIcon fontSize='large' color='secondary'></PencilIcon>
            </Link>
            <DeleteIcon fontSize='large' onClick={gestionarBin}></DeleteIcon>
        </div>
    </div>
  );

  const validarQuitarFav = async function(){
    let datos = {
        email: localStorage.getItem("mail"),
        idr: id
    }
    let getUpdate = await quitarFav(datos);
    if (getUpdate.rdo===0 ){
        console.log("Quité la receta",banFav)
    }else{
        alert("Error al quitar Favorito")
    }
  }

  const validarAgregarFav = async function(){
    let datos = {
        email: localStorage.getItem("mail"),
        idr: id
    }
    let getUpdate = await agregarFav(datos);
    if (getUpdate.rdo===0 ){
        console.log("Agregé la receta",banFav)
    }else{
        alert("Error al agregar Favorito")
    }
  }

  const validarNuevaCalificacion = async function(){
    let datos ={
        id: id,
        puntos: puntosSlider,
        email: localStorage.getItem("mail")
    }
    let getUpdate = await agregarCalificacion(datos)
    if (getUpdate.rdo===0 ){
        var calificacionExacta = getUpdate.result.cantPuntos!==0 ? getUpdate.result.puntos/getUpdate.result.cantPuntos: 0;
        setCalificacion(calificacionExacta.toFixed(1));
    }else{
        console.log("AAAAA")
        alert("Error al agregar Calificación")
    }
  }

  const gestionarSlider = () =>{
    if(!localStorage.getItem("mail")){
        setTitlePop("Primero debes loguearte");
        setTextPop("Para poder calificar una receta primero debes loguearte en la página");
        setOpen(true);
    }else{
        setTitlePop("Se ha guardado su calificación");
        validarNuevaCalificacion();
        setOpen(true);
        /* if(!open){
              window.location.reload(false);
        } */
    }
  };

  const gestionarFav = () =>{
      if(!localStorage.getItem("mail")){
          setTitlePop("Primero debes loguearte");
          setTextPop("Para poder agregar a favoritos primero debes loguearte en la página");
          setOpen(true);
        }
        else{
          console.log("banfavbanfav",banFav.current)
          if(banFav.current){
              setTitlePop("Receta eliminada de tus favoritos");
              validarQuitarFav()
          }else{
              setTitlePop("Receta agregada a tus favoritos");
              validarAgregarFav();
          }
          renderFav();
          setOpen(true);
          if(!open){
              window.location.reload(false);
          }
        }
  };
  const renderNoCreador = (
    <div className={classes.visita}>
        <div style={{marginLeft:"1%"}}>      
            <label>Calificar Receta:</label>
                <Slider className={classes.slider}
                    step={1}
                    valueLabelDisplay="auto"
                    max={5}
                    min={1}
                    onChange={(_,value) => setPuntosSlider(value)}
                    defaultValue={3}>
                </Slider>
                <Button variant='contained' color="primary" onClick={gestionarSlider}>
                    Calificar
                </Button>
        </div>
        <div>
            <FavoriteIcon onClick={gestionarFav}
                fontSize='large'
                color={favColor}>
            </FavoriteIcon>
        </div>
    </div>
  );


  return (
    <div  style={
        {minHeight: '100vh',
        backgroundColor:"#93C07C",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

        }}>
    <Card className={classes.card}>
        <CardActionArea className={classes.cardBody}>
            <CardMedia
                className={classes.image}
                component="imagen"
                image= {imagen}
            />
            <CardContent>
                <div className={classes.row}>
                    <Typography variant="h4" xs={12} >{nombre} </Typography>
                    <Typography variant="h5" xs={12} >Dificultad: {dificultad}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant="h5" >Calificación: {calificacion!=="0.0" ? calificacion : 
                    <span>Sin calificaciones</span>}
                    </Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant="h5" >Autor: {autor}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant="h6" >Ingredientes: {ingredientes}</Typography>
                </div>
                <Typography paragraph>
                <br></br>
                    {procedimiento}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            {autor===localStorage.getItem("mail") ? renderCreador : renderNoCreador}    
            {console.log(autor===localStorage.getItem("mail"))}
        </CardActions>
    </Card>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titlePop}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {textPop}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            {autor===localStorage.getItem("mail") ? 
            <>
            <Button onClick={eliminar} >OK</Button>
            <Button onClick={handleClose} autoFocus >NO!!</Button></> : 

            <Button onClick={handleClose} autoFocus >OK</Button>}
        </DialogActions>
      </Dialog>
 
  </div>
  )
}
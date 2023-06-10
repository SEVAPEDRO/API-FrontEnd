import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { blue, red, yellow } from '@material-ui/core/colors';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { getRecetaById } from '../../controller/miApp.controller';
import { imgByIdReceta } from '../../controller/miApp.controller';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    backgroundColor: yellow,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  InfoIcon:{
    color:red,
  },
  avatar: {
    backgroundColor: blue[500],
  },
}));

export default function RecetaCardLog(props) {

  const[data,setData] = useState([]);
  const [imagen, setImagen]=useState("");
  const[letra, setLetra]=useState("");
  const[imagenRespuesta, setRespuestaImagen]= useState([])

  useEffect(() => {
   const fetchData = async () => {
     const receta = await getRecetaById(props.id);
     const imagenRespuesta= await imgByIdReceta(props.id);
     setRespuestaImagen(imagenRespuesta);
     setImagen(imagenRespuesta[0].nombreImagen);
     setData(receta.result);
     setLetra(receta.result.autor.charAt(0));
     console.log(letra)
   };
   fetchData();
  },[localStorage.getItem("mail")]);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [cls, setCls] = useState("green");  
  const newTo = {
    pathname: `/receta/${props.id}`,
    state:{
      /*nombre: props.nombre,
      dificultad: props.dificultad,
      //img: props.imagen,
      mail: props.mail,
      procedimiento: props.procedimiento,*/
    },
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <style>{`
        .red {color: red}
        .grey {color: grey}
      `}</style>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
             {letra}
          </Avatar>
        }
        title={data.titulo}
        subheader={data.categoria}
      />
      <CardMedia 
        className={classes.media}
        subheader={data.dificultad}
        image= {imagen}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         Dificultad: {data.dificultad}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props._id}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
      <CardActions disableSpacing>
        <Link to={newTo} >
            <InfoIcon />
            Ver receta
          </Link>
      </CardActions>
    </Card>

  );
}

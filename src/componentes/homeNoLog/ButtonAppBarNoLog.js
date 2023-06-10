import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Menu, MenuItem, useMediaQuery, useTheme } from '@material-ui/core';

import DrawerComponentNoLog from './DrawerComponentNoLog';
import IconoPerfil from "../homeLog/IconoPerfil"
import DrawerComponentLog from "../homeLog/DrawerComponentLog"
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu: () => ({
    position: "top",
    right: 0
  }),
  title: {
    flexGrow: 1,
  }
}));

export default function ButtonAppBarNoLogeado() {
  const classes = useStyles();
  const theme = useTheme(); //Get a copy of our default theme in our component so that we can access the breakpoints and pass the useMediaQuery
  const isMatch = useMediaQuery(theme.breakpoints.down('xs'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorCat, setAnchorCat] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenCat = (event) => {
    setAnchorCat(event.currentTarget);
  };

  const handleCloseCat = () => {
    setAnchorCat(null);
  };
  const logOut = () =>{
    localStorage.removeItem("mail");
    localStorage.removeItem('x');
    handleCloseMenu();
    window.location.href='/';
  };

  const renderNoApp =(<div className={classes.root}>
    <AppBar style={{ backgroundColor: "black ", color:"white" }} position="static">
      <Toolbar>
      <Button onClick={()=> window.location.href='/'} color="inherit" style={{marginRight:"18px"}}>
            <h2>Recetas.com
              </h2>
            </Button>
      
        
        <Typography variant="h6" className={classes.title}
        >
        </Typography>
        {isMatch ? (
          <>
            <DrawerComponentNoLog />
          </>
        ) : (
          <>

            <Button onClick={()=> window.location.href='/signIn'} color="inherit" style={{marginRight:"18px"}}>
            Ingresar
            </Button>
            
            <Button  onClick={()=> window.location.href='/register'} color="inherit" style={{marginRight:"18px"}}>           
            Registrarse
            </Button>          
        </>
        )}
  
      </Toolbar>
    </AppBar>
  </div>
  );
  
const renderApp=( <div className={classes.root}>
  <AppBar style={{ backgroundColor: "black ", color:"white" }} position="static">
    <Toolbar>
    <Button onClick={()=> window.location.href='/'} color="inherit" style={{marginRight:"18px"}}>
          <h1>Recetas.com
            </h1>
          </Button>
      <Typography variant="h6" className={classes.title}
      >
      </Typography>
    <IconoPerfil letra={localStorage.getItem("mail")}/>
    
      {isMatch ? (
        <>
          <DrawerComponentLog />
        </>
      ) : (
        <>
          <IconButton
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu"
            onClick={handleOpenMenu}
            aria-controls="menu">
            <MenuIcon />
          </IconButton> 
      </>
      )}
    </Toolbar>
  </AppBar>
    <Menu id='menu' 
      anchorEl={anchorEl} 
      onClose={handleCloseMenu} 
      open={Boolean(anchorEl)}
      style={{marginTop:"50px"}}
      >
      <MenuItem onClick={()=> window.location.href='/favoritos'} color="inherit" style={{padding:"10px"}}>Favoritos</MenuItem>
      <MenuItem onClick={()=> window.location.href='/altaReceta'} color="inherit" style={{padding:"10px"}} >Crear Receta </MenuItem>
      <MenuItem onClick={()=> window.location.href='/misRecetas'} color="inherit" style={{padding:"10px"}} >Mis Recetas </MenuItem>
      <MenuItem onClick={()=> window.location.href='/perfil'} color="inherit" style={{padding:"10px"}} >Mi Perfil </MenuItem>

      <MenuItem onClick={logOut} style={{padding:"10px"}}>Salir</MenuItem>
    </Menu> 
</div>);


  return (
    localStorage.getItem("mail") ?  renderApp : renderNoApp

  );
}

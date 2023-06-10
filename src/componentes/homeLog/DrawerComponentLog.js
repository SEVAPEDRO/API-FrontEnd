import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  makeStyles,
  Drawer,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const DrawerComponent = () => {
  const useStyles = makeStyles(theme => ({
    drawerContainer: {},
    iconButtonContainer: {
      marginLeft: 'auto',
      color: 'white',
    },

    menuIconToggle: {
      fontSize: '3rem',
    },
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  

  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();
  const logOut = () =>{
    localStorage.removeItem("mail");
    localStorage.removeItem('x');
    setOpenDrawer(false);
    window.location.href='/';
  };

  
  return (
    <>
      <Drawer
        anchor='right'
        classes={{ paper: classes.drawerContainer }}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}>
        <List>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon onClick={()=> window.location.href='/favoritos'} color="inherit" style={{padding:"10px"}}>
              <ListItemText> Favoritos</ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon onClick={()=> window.location.href='/altaReceta'} color="inherit" style={{padding:"10px"}}>
              <ListItemText> Crear receta</ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon onClick={()=> window.location.href='/misRecetas'} color="inherit" style={{padding:"10px"}}>
              <ListItemText> Mis recetas</ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon onClick={()=> window.location.href='/perfil'} color="inherit" style={{padding:"10px"}}>
              <ListItemText> Mi Perfil</ListItemText>
            </ListItemIcon>
          </ListItem>


          <ListItem divider button onClick={logOut}>
            <ListItemIcon color="inherit" style={{padding:"10px"}}>
              <ListItemText>Salir</ListItemText>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
      <IconButton
        className={classes.iconButtonContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple>
        <MenuIcon className={classes.menuIconToggle} />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
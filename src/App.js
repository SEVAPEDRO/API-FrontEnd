import React from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import {Routes, Route } from "react-router";
import ButtonAppBar from "./componentes/homeNoLog/ButtonAppBarNoLog";
import { makeStyles } from '@material-ui/core/styles';
import Login from "./componentes/login/Login"
import Register from "./componentes/Register"
import HomeLog from "./componentes/homeLog/HomeLog";
import AltaReceta from "./componentes/altaReceta/AltaReceta";
import ModificarReceta from "./componentes/ModificarReceta";
import RecuperoContra from "./componentes/RecuperoContra"
import Perfil from "./componentes/Perfil"
import Receta from "./componentes/Receta"
import Favoritos from "./componentes/Favoritos";
import MisRecetas from "./componentes/MisRecetas";
import MailContra from "./componentes/MailContra";


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    // backgroundImage: `url(${process.env.PUBLIC_URL + '/fotoHome.jpg'})`,
    backgroundColor:"rgb(61, 136, 233)",
    backgroundSize:"contain",
    backgroundPosition:"center",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
function App() {
  const classes = useStyles();
  
  return (
       <Router>         
         <ButtonAppBar/>                     
         <Switch>
           <Route path="/signIn" exact component={Login}/>
           <Route path="/register" exact component={Register}/>
           <Route path="/altaReceta" exact component={AltaReceta}/>
          
          <Route path="/olvideContrasena" exact component={RecuperoContra}/>
          <Route path="/mailContrasena" exact component={MailContra}/>
          <Route path="/modificarReceta/:id" exact component={ModificarReceta}/>

           <Route path="/perfil" exact component={Perfil}/>
           <Route path="/favoritos" exact component={Favoritos}/>
           <Route path="/misRecetas" exact component={MisRecetas}/>

           <Route path="/receta/:id" component={Receta}/>         
           <div className={classes.root} >             
           <HomeLog/>       
         </div>                     
         </Switch>
                    

       </Router>    
  );
}
  
export default App;
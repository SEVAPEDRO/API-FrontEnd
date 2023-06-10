import { Grid } from '@material-ui/core'
import React from 'react'
//import Recetas from '../Recetas'
import RecetaCardLog from './homeLog/RecetaCardLog'
import { misRecetas } from '../controller/miApp.controller'
import { useState } from 'react'
import { useEffect } from 'react'
import Footer from './footer/Footer'


function MisRecetas() {


  //
  const[data,setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const infoRecetas = await misRecetas(localStorage.getItem("mail"));
      console.log(infoRecetas)
      if(infoRecetas.rdo===2){
        alert("Debes estar logueado para ver esta pagina");
        window.location.href='/';
      }
      setData(infoRecetas.recetas);
      console.log(infoRecetas.recetas);
    };
    fetchData();
  },[localStorage.getItem("mail")]);
  //
  return (
    <div style={
        {minHeight: '100vh',
        backgroundColor:"#B6F5E3",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
  
        }}> 
        <div>
        <h1 style={{textAlign: 'center',color:"white",
         alignSelf: 'center', fontSize:"75px"}}>
          Mis Recetas
        </h1>
        </div>
        <Grid container spacing={3}>{data.map((data)=>(
          <Grid item key={data._id} xs={12} md={6} lg={4}>
            <RecetaCardLog id={data._id}/>
          </Grid>
        ))}
        </Grid>
        <Footer/>
    </div>
  )
}

export default MisRecetas
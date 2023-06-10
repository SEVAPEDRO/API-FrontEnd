import { Grid } from '@material-ui/core'
import React from 'react'
import RecetaCardLog from './homeLog/RecetaCardLog'
import Footer from './footer/Footer'
import { useState } from 'react'
import { useEffect } from 'react'
import {misFavs} from "../controller/miApp.controller";


function Favoritos() {

  const[data,setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const infoRecetas = await misFavs(localStorage.getItem("mail"));
      if(infoRecetas.rdo===2){
        alert("Debes estar logueado para ver esta pagina");
        window.location.href='/';
      }
      setData(infoRecetas.recetas);
      //console.log(data);
    };
    fetchData();
  },[localStorage.getItem("mail")]);


  return (
    <div style={
      {minHeight: '100vh',
      backgroundColor:"#FCA253",
      //backgroundImage: `url(${process.env.PUBLIC_URL + '/food2.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',

      }
  }>
        <h1 style={{textAlign: 'center',color:"white",
    alignSelf: 'center', fontSize:"75px"}}>
          Mis favoritos
        </h1>
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

export default Favoritos
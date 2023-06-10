import urlWebServices from '../controller/webServices.js';

export const login = async function(login){
    //url webservices
    let url = urlWebServices.login;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', login.email);
    formData.append('password', login.password);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
               // 'x-access-token': WebToken.webToken,
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 201:
                {
                    //guardo token
                    localStorage.setItem("x",data.loginUser.token);
                    //guardo usuario logueado
                    let user = data.loginUser.user;
                    localStorage.setItem("mail",user.email);
                    
                    return ({rdo:0,mensaje:"Ok"});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:data.message});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const registration = async function(datos){
    //url webservices
    let url = urlWebServices.registration;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos.email);
    formData.append('password', datos.password);
    formData.append('name', datos.name);
    formData.append('mascota', datos.mascota);
    formData.append('telefono', datos.telefono);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
               // 'x-access-token': WebToken.webToken,
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 201:
                {
                    //guardo token
                    localStorage.setItem("x",data.createdUser);
                    //guardo usuario logueado
                    localStorage.setItem("mail",datos.email);
                    
                    return ({rdo:0,mensaje:"Ok"});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:data.message});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const misRecetas = async function(datos){
    //url webservices
    let url = urlWebServices.misRecetas;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 201:
                {
                    let recetas = data.recetas;                    
                    return ({rdo:0,recetas});//correcto
                }
                case 500:
                {
                    return({rdo:2,data});
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const agregarFav = async function(datos){
    //url webservices
    let url = urlWebServices.agregarFav;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos.email);
    formData.append('idr', datos.idr);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'PUT', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 201:
                {                   
                    return ({rdo:0,mensaje:"Ok"});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const misFavs = async function(datos){
    //url webservices
    let url = urlWebServices.misFavs;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 201:
                {                
                    let recetas = data.favs;   
                    return ({rdo:0,recetas});//correcto
                }
                case 500:
                {
                    return({rdo:2,data});
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const updatePerfil = async function(datos){
    //url webservices
    let url = urlWebServices.updatePerfil;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos.email);
    formData.append('name', datos.name);
    formData.append('telefono', datos.telefono);
    formData.append('mascota', datos.mascota);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 200:
                {                  
                    return ({rdo:0,mensaje:"OK"});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const updatePass = async function(datos){
    //url webservices
    let url = urlWebServices.updatePass;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos.email);
    formData.append('password', datos.password);
    formData.append('mascota', datos.mascota);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'PUT', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 200:
                {                  
                    return ({rdo:0,mensaje:"OK"});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:data.message});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const recuperarPass = async function(datos){
    //url webservices
    let url = urlWebServices.recuperarPass;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos.email);
    formData.append('mascota', datos.mascota);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                //'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 200:
                {                  
                    return ({rdo:0,mensaje:"OK"});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:data.message});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const getRecetaById= async function(datos){
     //url webservices
     let url = urlWebServices.getRecetaById;
     //armo json con datos
     const formData = new URLSearchParams();
     formData.append('_id', datos);
     //console.log("dato",formData);
     //console.log("url",url);
     try{
         let response = await fetch(url,{
             method: 'POST', // or 'PUT'
             mode: "cors",
             headers:{
                 'Accept':'application/x-www-form-urlencoded',
                 //'x-access-token': localStorage.getItem('x'),
                 'Origin':'http://localhost:3000',
                 'Content-Type': 'application/x-www-form-urlencoded'},
             body: formData,
             
         });
         
         let rdo = response.status;
         console.log("response",response);
         let receta = await response.json();
         console.log("jsonresponse",receta);
             switch(rdo){
                 case 200:
                 {
                     let result = receta.data;                    
                     return ({rdo:0,result});//correcto
                 }
                 default:
                 {
                     //otro error
                     return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                 }
             }
     }
     catch(error){
         console.log("error",error);
     };
}

export const getUserByEmail = async function(datos){
    //url webservices
    let url = urlWebServices.getUserByEmail;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let info = await response.json();
        console.log("jsonresponse",info);
            switch(rdo){
                case 200:
                {           
                    let user = info.data;   
                    return ({rdo:0,user});//correcto
                }
                case 500:
                {
                    return({rdo:2,info});
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const checkFav = async function(datos){
    //url webservices
    let url = urlWebServices.checkFav;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos.email);
    formData.append('idr', datos.idr);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                //'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let datas = await response.json();
        console.log("jsonresponse",datas);
            switch(rdo){
                case 200:
                {           
                    let bandera = datas.data      
                    return ({rdo:0,bandera});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const quitarFav = async function(datos){
    //url webservices
    let url = urlWebServices.quitarFav;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos.email);
    formData.append('idr', datos.idr);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'PUT', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 201:
                {                
                    return ({rdo:0,mensaje:"OK"});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const altaReceta = async function(datos){
    //url webservices
    let url = urlWebServices.altaReceta;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('autor', datos.autor);
    formData.append('titulo', datos.titulo);
    formData.append('categoria', datos.categoria);
    formData.append('ingredientes', datos.ingredientes);
    formData.append('dificultad', datos.dificultad);
    formData.append('procedimiento', datos.procedimiento);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let info = await response.json();
        console.log("jsonresponse",info);
            switch(rdo){
                case 201:
                {                
                    let idr=info.idr;
                    return ({rdo:0, idr});//correcto
                }
                case 500:
                {
                    return({rdo:2,info});
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const updateReceta = async function(datos){
    //url webservices
    let url = urlWebServices.updateReceta;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('id', datos.id);
    formData.append('titulo', datos.titulo);
    formData.append('categoria', datos.categoria);
    formData.append('ingredientes', datos.ingredientes);
    formData.append('dificultad', datos.dificultad);
    formData.append('procedimiento', datos.procedimiento);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'PUT', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 200:
                {                
                    return ({rdo:0,mensaje:"OK"});//correcto
                }
                case 500:
                {
                    return({rdo:2,data});
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const agregarCalificacion = async function(datos){
    //url webservices
    let url = urlWebServices.agregarCalificacion;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('id', datos.id);
    formData.append('puntos', datos.puntos);
    formData.append('email', datos.email);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'PUT', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let receta = await response.json();
        console.log("jsonresponse",receta);
            switch(rdo){
                case 201:
                {                
                    let result = receta.data;
                    return ({rdo:0,result});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const filterRecetas = async function(datos){
    //url webservices
    let url = urlWebServices.filterRecetas;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('titulo', datos.titulo);
    formData.append('categoria', datos.categoria);
    formData.append('ingredientes', datos.ingredientes);
    formData.append('dificultad', datos.dificultad);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                //'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let receta = await response.json();
        console.log("jsonresponse",receta);
            switch(rdo){
                case 200:
                {        
                    let result = receta.data;
                    return ({rdo:0,result});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const eliminarReceta = async function(datos){
    //url webservices
    let url = urlWebServices.eliminarReceta;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('idr', datos.idr);
    formData.append('autor', datos.autor);
    //console.log("dato",formData);
    //console.log("url",url);
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 201:
                {        
                    return ({rdo:0,mensaje:"OK"});//correcto
                }
                default:
                {
                    return ({rdo:1,mensaje:"No se pudo eliminar la receta"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const guardarImgUser = async function(datos){
    //url webservices
    let url = urlWebServices.guardarImgUser;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', datos.email);
    formData.append('nombreImagen', datos.nombreImagen);
    formData.append('idReceta', datos.idReceta);
 
    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 201:
                {        
                    return ({rdo:0,mensaje:"OK"});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const imgUserByMail = async function(datos)
{
    //url webservices
    let url = urlWebServices.getImgUser;
    //console.log("url",url);
    //console.log("token",WebToken.webToken);
    const formData = new URLSearchParams();
    formData.append('email', datos.email);
    try
    {
        let response = await fetch(url,{
            method: 'GET', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body:formData
        });
        if (response.status===200)
        {
            let data = await response.json();
            console.log("imagenesUser",data);
            let listaImg = data.data.docs;
            return listaImg;
        }
        else
        {
            let vacio=[];
            console.log("No hay imagenes")
            return (vacio);
            
        }
    }
    catch(error)
    {
        console.log("error",error);
    };
}

export const uploadFileImg= async function(files,nombres)
{
     //url webservices
     let url = urlWebServices.uploadFileImg;
  
    console.log('files', files)
    console.log('nombres',nombres)
    const formData = new FormData();
    //agrego archivos para subir
    for (let i = 0; i < files.length; i++)
    {
        formData.append('files', files[i], nombres[i])
    }
   
    try
    {
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/form-data',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                //'Content-Type': 'application/form-data'
            },
            body:formData
        });
    
        let archivos = await response.json()
        console.log('respuestaUpload', archivos);
        return archivos;
    } catch (err) {
        alert('Error uploading the files')
        console.log('Error uploading the files', err)
    }
}

export const imgByIdReceta = async function(datos)
{
    //url webservices
    let url = urlWebServices.imgByIdReceta;
    //console.log("url",url);
    //console.log("token",WebToken.webToken);
    const formData = new URLSearchParams();
    formData.append('idReceta', datos);
    try
    {
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                //'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body:formData
        });

        if (response.status===200)
        {
            let data = await response.json();
            console.log("imagenesUser",data);
            let listaImg = data.data.docs;
            return listaImg;
        }
        else
        {
            let vacio=[];
            console.log("No hay imagenes")
            return (vacio);
            
        }
    }
    catch(error)
    {
        console.log("error",error);
    };
}

export const updateUserImg = async function(datos)
{
    //url webservices
    let url = urlWebServices.updateUserImg;
    //console.log("url",url);
    //console.log("token",WebToken.webToken);
    const formData = new URLSearchParams();
    formData.append('email', datos.email);
    formData.append('nombreImagen', datos.nombreImagen);
    formData.append('idReceta', datos.idReceta);


    try
    {
        let response = await fetch(url,{
            method: 'PUT', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body:formData
        });

        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo){
                case 201:
                {        
                    return ({rdo:0,mensaje:"OK"});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

export const famousImages = async function(){
    let url = urlWebServices.famousImages;

    try{
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'}, 
        });
        let rdo = response.status;
        console.log("response",response);
        let receta = await response.json();
        console.log("jsonresponse",receta);
            switch(rdo){
                case 200:
                {        
                    let result = receta.data;
                    return ({rdo:0,result});//correcto
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error){
        console.log("error",error);
    };
}

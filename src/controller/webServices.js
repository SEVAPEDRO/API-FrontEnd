const urlApi = "http://localhost:4000/";
//const urlApi = "https://api-viernes.herokuapp.com/";
console.log("url",urlApi);

const urlWebServices = {
    login:urlApi +"api/users/login",
    registration:urlApi +"api/users/registration",
    misRecetas:urlApi +"api/users/misRecetas",
    agregarFav:urlApi +"api/users/agregarFav",
    misFavs:urlApi +"api/users/misFavs",
    updatePerfil:urlApi +"api/users/updatePerfil",
    updatePass:urlApi +"api/users/updatePass",
    recuperarPass:urlApi + "api/users/recuperarPass",
    getRecetaById: urlApi+"api/users/getRecetaById",
    getUserByEmail:urlApi +"api/users/getUserByEmail",
    checkFav:urlApi +"api/users/checkFav",
    quitarFav:urlApi +"api/users/quitarFav",

    altaReceta:urlApi +"api/users/altaReceta",
    updateReceta:urlApi +"api/users/updateReceta",
    agregarCalificacion:urlApi +"api/users/agregarCalificacion",
    filterRecetas:urlApi +"api/users/filterRecetas",
    eliminarReceta:urlApi +"api/users/eliminarReceta",

    famousImages: urlApi +"api/users/getFamousImages",
   // uploadFileImg: urlApi + "utils/uploadImg",
    guardarImgUser: urlApi + "api/users/guardarImgUser",
    imgUserByMail: urlApi + "api/users/imgUserByMail",
    imgByIdReceta: urlApi + "api/users/imgByIdReceta",
    uploadFileImg: urlApi + "api/users/uploadImg",
    updateUserImg: urlApi + "api/users/updateUserImg",
}

export default urlWebServices;
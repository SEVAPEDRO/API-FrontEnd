import React, {useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Footer from '../footer/Footer'
import List from "../filterBarPrueba/ListFiltrada"
import SearchIcon from "@material-ui/icons/Search"
import { filterRecetas, famousImages } from '../../controller/miApp.controller'
import PaginationPrueba from "../pagination/PaginationPrueba"

export default function HomeLog() {
  const[selectedCategory, setSelectedCategory]= useState("")
  const[selectedDificultad, setSelectedDificultad]= useState("")
  const [inputSearch, setInputSearch]=useState("");
  const [inputIngrediente, setInputIngrediente]=useState("");
  const [valCategoria, setValCategoria] = useState("");
  const [valDificultad, setValDificultad] = useState("");

  ///
  const[data, setData]= useState([])
  useEffect(() => {
    const fetchData = async () => {
      const infoRecetas = await famousImages();
      setData(infoRecetas.result)
    };
    fetchData();
   },[localStorage.getItem("mail")]);

  const filtrarRecetas = async function(){
    let datos = {
      titulo: inputSearch,
      categoria: valCategoria,
      dificultad: valDificultad,
      ingredientes: inputIngrediente,
    }
    const infoRecetas = await filterRecetas(datos);
    setSelectedCategory("");
    setSelectedDificultad("");
    console.log(infoRecetas.result)
    setData(infoRecetas.result);
    setCurrentPage(1)    
}

///pagination
  const [currentPage, setCurrentPage]= useState(1);
  const [postsPerPage]= useState(6);
  const paginate=pageNumber=> setCurrentPage(pageNumber)
  const indexOfLastPost= currentPage*postsPerPage;
  const indexOfFirstPost= indexOfLastPost-postsPerPage;
  const currentPosts= data.slice(indexOfFirstPost,indexOfLastPost);

 return (
      <Container>
        <Container>     
      <Grid container>
        <Grid item xs={12} md={12}>          
          <div className="searchBar-wrap">
              <SearchIcon className='searchBar-icon'/>
                <input style={{"marginTop":"2%","width":"60%", "height":"40px", "fontSize":"25px"}}
                  type="search"
                  placeholder="Nombre Receta"
                  value={inputSearch}
                  onChange={e=>setInputSearch(e.target.value)}
              />
          </div>
          </Grid>
        </Grid>
          <Grid container>   
          <Grid item xs={12} md={6}>
          <div className="input-group" style={{"fontSize":"40px"}}>
              <div>
              <label>🧠Dificultad  </label>
              <select style={{"fontSize":"20px", "padding": "10px", "backgroundColor":"blue", "color": "white"}} value={valDificultad} onChange={(e)=> setValDificultad(e.target.value)} >
                 <option></option>
                 <option>1</option>
                 <option>2</option>
                 <option>3</option>
                 <option>4</option>
                 <option>5</option>
              </select>
            </div>
            <div className="input-group" style={{"fontSize":"40px"}}>
              <div>
              <label>🍴 Categoría  </label>
              <select style={{"fontSize":"20px", "padding": "10px", "backgroundColor":"blue", "color": "white"}} value={valCategoria} onChange={(e)=> setValCategoria(e.target.value)} >
                 <option></option>
                 <option>Pasta</option>
                 <option>Carnes</option>
                 <option>Postres</option>
                 <option>Sopa</option>
                 <option>Guiso</option>
                 <option>Pizza</option>
                 <option>Libre gluten</option>
                 <option>Pescados</option>
                 <option>Empanadas</option>
                 <option>Vegetariano</option>
              </select>
            </div>
          </div>
          </div>                  
          </Grid> 
          </Grid>
          <Grid container>
            <Grid item xs={12} md={12}>   
              <div className="searchBar-wrap">
                  <SearchIcon className='searchBar-icon'/>
                    <input
                      style={{"marginBottom":"1%","width":"60%", "height":"40px", "fontSize":"25px"}}
                      type="search"
                      placeholder="Ingrediente"
                      value={inputIngrediente}
                      onChange={e=>setInputIngrediente(e.target.value)}
                  />
              </div>
              </Grid>   
          </Grid>
          <button style={{"marginBottom":"1%",textAlign: 'center',
                  alignSelf: 'center', fontSize:"55px"}} onClick={filtrarRecetas}>Buscar</button>
        </Container>
            <Grid container>
               <List list={currentPosts}/>
               <PaginationPrueba postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate}>
               </PaginationPrueba>
            </Grid>
        <Footer/>
      </Container>     
  )
}
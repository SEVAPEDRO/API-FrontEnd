import React from "react"
import Grid from '@material-ui/core/Grid'
import "./footer.css"
import Container from '@material-ui/core/Container'

function Footer() {
  return (
    <Container className="main-footer">
        <Grid container spacing={3}>
            <Grid item xs={4} md={6} lg={4}>
                <h4>Recetas.com</h4>
                <ul className="list-unstyled">
                    <li> +54112345</li>
                    <li> Buenos Aires, Argentina</li>
                    <li> Calle 1234</li>
                </ul>
            </Grid>
            <Grid item xs={4} md={6} lg={4}>
                <h4>Staff</h4>
                <ul className="list-unstyled">
                    <li>Pedro Seva</li>
                    <li>Juan Manuel Nugnes</li>
                </ul>
            </Grid>
            <Grid item xs={4} md={6} lg={4}>
                <h4>Redes sociales</h4>
                <ul className="list-unstyled">
                    <li> Facebook</li>
                    <li>Instagram</li>
                    
                </ul>
            </Grid>
            <p className="col-sm">
                &copy;{new Date().getFullYear()} Recetas.com | Todos los derechos reservados | Términos de servicio | Privacidad
            </p>
        </Grid>
    </Container>
  )
}

export default Footer
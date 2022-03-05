import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid"
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button"
import { deleteRecipe } from "../store"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ExternalLink } from 'react-external-link';

const theme = createTheme({
      palette: {
        primary: {
          light: "#fafbfe",
          main: "#edf2fb",
        },
        secondary: {
          main: "#000000",
        },
      },
});

class SingleRecipe extends React.Component{
    render(){
      const recipe = this.props.recipes.filter((r) => 
            r.id === this.props.match.params.id
      )[0] || {};
      const stringr= recipe.ingredients
      let ingr = []
      stringr ? ingr = stringr.split('/') : []
      const strinst= recipe.instructions
      let instr = []
      strinst ? instr = strinst.split('/') : []
      return (
        <ThemeProvider theme={theme}>
        <div>
          
          <Grid container display="row" sx={{paddingLeft: 4, paddingTop:3}}>
          <Grid item item xs={12} sm={12} md={2}>
                <Card>
                  <CardMedia
                    component="img"
                    className="recipe-image"
                    sx={{ height: 250 }}
                    image={recipe.picture}
                  />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={5} >
              <Grid container display="column" alignItems="center" sx={{paddingLeft: 3}}>
                <Grid item>
                  <Box>
                  <h1>{recipe.name}</h1>
                  <p>Time: {recipe.time}</p>
                  <p>Servings: {recipe.servings}</p>
                  <p>Cuisine: {recipe.cuisine}</p>
                  <p>Link: <ExternalLink href={recipe.link} color="secondary">
                      {recipe.link}</ExternalLink></p>
                  <p>Rating: {recipe.rating}/5</p>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" sx={{paddingLeft: 4, paddingTop: 2}}>
            <Grid item item xs={12} sm={12} md={4} sx={{minHeight:"30vh"}}>
              <p>Ingredients:</p>
              {ingr.map((ingredient, i) => (
                  <p key={i}>{ingredient}</p>
              ))}
            </Grid>
            <Grid item item xs={12} sm={12} md={4} sx={{minHeight:"30vh"}}>
              <p>Instructions:</p>
              {instr.map((instruction, i) => (
                  <p key={i}>{i+1}. {instruction}</p>
              ))}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sx={{paddingLeft: 4, paddingTop:2}}>
            <Link to={`/recipes`} >
              <Button color="secondary" variant="outlined" onClick={ () => this.props.deleteRecipe(recipe)}>Delete</Button>
            </Link>            
            </Grid>
          </Grid>
        </div>
        </ThemeProvider>
       )  
    }
    
}

const mapStateToProps = (state) => {
    return {
      recipes: state.recipes,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      deleteRecipe: (recipe) => dispatch(deleteRecipe(recipe)),
  }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
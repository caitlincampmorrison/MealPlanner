import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid"
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import { deleteRecipe } from "../store"
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
          <Grid container display="column" alignItems="center" justifyContent="center" sx={{marginTop:5}}>
            <Grid item item xs={12} sm={12} md={10}>
                <Card>
                  <CardMedia
                    component="img"
                    className="recipe-image"
                    sx={{ height: 200 }}
                    image={recipe.picture}
                  />
              </Card>
            </Grid>
          </Grid>
          <Grid container sx={{marginLeft:17}}>
            <Grid item item xs={12} sm={12} md={12} >
              <h1>{recipe.name}</h1>
            </Grid>
          </Grid>
          <Grid container sx={{marginLeft:14.5}} spacing={2}>
            <Grid item>
              <p>Time: {recipe.time}</p>
            </Grid>
            <Grid item>
              <p>Servings: {recipe.servings}</p>
            </Grid>
            <Grid item>
              <p>Cuisine: {recipe.cuisine}</p>
            </Grid>
            <Grid item>
              <p>Link: {recipe.link}</p>
            </Grid>
            <Grid item>
              <p>Rating: {recipe.rating}/5</p>
            </Grid>
          </Grid>
          <Grid container direction="row" sx={{marginLeft:17}}>
            <Grid item item xs={12} sm={12} md={4} sx={{minHeight:"30vh"}}>
              <p>Ingredients</p>
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
          <Link to={`/recipes`}>
            <Button sx={{marginLeft:17}} color="secondary" variant="outlined" onClick={ () => this.props.deleteRecipe(recipe)}>Delete</Button>
          </Link>
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
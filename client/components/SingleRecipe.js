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
        <div>
          <Grid container>
            <Grid item item xs={12} sm={12} md={12} sx={{minHeight:"30vh"}}>
                <Card className="main_page_top">
                  <CardMedia
                    className="recipe-image"
                    sx={{ height: 300 }}
                    image={recipe.picture}
                  >
                    <CardContent>
                      <Typography component="h1">{recipe.name}</Typography>
                    </CardContent>
                  </CardMedia>
              </Card>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item item xs={12} sm={12} md={12} sx={{minHeight:"30vh"}}>
              <h1>{recipe.name}</h1>
            </Grid>
          </Grid>
          <Grid container spacing = {2}>
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
          <Grid container>
            <Grid item item xs={12} sm={12} md={12} sx={{minHeight:"30vh"}}>
              {ingr.map((ingredient, i) => (
                  <p key={i}>{i+1}. {ingredient}</p>
              ))}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item item xs={12} sm={12} md={12} sx={{minHeight:"30vh"}}>
              {instr.map((instruction, i) => (
                  <p key={i}>{i+1}. {instruction}</p>
              ))}
            </Grid>
          </Grid>
          {recipe.name}
          <Link to={`/recipes`}>
            <Button onClick={ () => this.props.deleteRecipe(recipe)}>Delete</Button>
          </Link>
        </div>
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
import React from "react"
import {connect} from "react-redux"
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RecipeSort from "./RecipeSort"
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const RecipeList = ( { recipes, recipe_sort })  => {
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
  //Sort By Name
  const sortName = function (a, b) {
    let nameA = a.name.toUpperCase
    let nameB = b.name.toUpperCase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };
  //Sort By Time
  const sortTime = function (a, b) {
    return b.time - a.time;
  };
  //Sort By Cuisine
  const sortCuisine = function (a, b) {
    let cuisineA = a.cuisine.toUpperCase
    let cuisineB = b.cuisine.toUpperCase
    if (cuisineA < cuisineB) {
      return -1;
    }
    if (cuisineA > cuisineB) {
      return 1;
    }
    return 0;
  };
  return (  
    <ThemeProvider theme={theme}>    
        <div id="recipes">
          <Grid container direction="row" justifyContent="flex-end" sx={{marginTop:5}}>
              <Grid item>
                <RecipeSort/>
              </Grid>
          </Grid>
          <Grid container sx={{marginTop:2}} direction="column" alignItems="center" spacing={2}>
            <Grid item>
            <Grid container spacing={1} className="category_paintcards" direction="row">
                {recipes
                .sort((recipe_sort.recipe_sort === 'Name') ? sortName :
                  ((recipe_sort.recipe_sort === 'Cuisine') ? sortCuisine : sortTime 
                )).map((recipe) => (
                  <Grid item 
                      sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                    key={recipe.id} sm={6} md={3} lg={2.4}>
                    <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                        <Card component={Paper}
                        sx={{
                          height: 300,
                          width: 300,
                        }}>
                            <CardMedia
                              component="img"
                              image={recipe.picture}
                              sx={{height:200}}
                            />
                            <Typography color="secondary" size="large" sx={{textAlign:"center", marginTop:2}}>
                              <b>{recipe.name}</b>
                              <p>{recipe.rating}/5    ~   {recipe.time} min</p>
                            </Typography>
                            <Typography></Typography>
                        </Card>
                    </Link>

                  </Grid>             
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
        </ThemeProvider>
     )
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
        recipe_sort: state.recipe_sort
    }
}

export default connect(mapStateToProps, null)(RecipeList)

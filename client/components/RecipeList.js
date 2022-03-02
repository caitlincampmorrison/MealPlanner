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

const RecipeList = ( { recipes })  => {
     return (      
        <div id="recipes">
            <Grid container sx={{marginTop: 4}}>
                {recipes.map((recipe) => (
                    <Grid item xs={{marginTop: 10}}
                      xs={12} sm={6} md={3}
                      key={recipe.id}
                    >
                      <Card
                      >
                        <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                        <CardMedia
                          sx={{ height: 250 }}
                          image={recipe.picture}
                        />
                        </Link>
                        <Box
                          component={"h4"}
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          <Typography color="secondary" size="large">
                            <b>{recipe.name}</b>
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                ))}
          </Grid>
        </div>
     )
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
    }
}

export default connect(mapStateToProps, null)(RecipeList)

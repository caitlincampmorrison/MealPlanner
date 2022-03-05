import React from "react"
import {connect} from "react-redux"
import Box from "@mui/material/Box"
import { Link } from 'react-router-dom';
import {deleteRecipeFromCalendar} from "../store"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const WeeklyRecipes = ({ day, recipes, calendars, deleteRecipeFromCalendar}) => {
    const weeksrecipe = calendars.filter(d => d.dayId === day)
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
    return (
        <ThemeProvider theme={theme}>
        <div>
            <Box>
                {weeksrecipe ? 
                    weeksrecipe.map(r => 
                        <div key={r.id}>
                            <Grid container direction="row" alignItems="center" padding={0}>
                                <Grid item>
                                    <Link to={`/recipes/${r.recipeId}`} key={r.id}>
                                        <p style={{color:"black"}}>{r.recipeName}</p> 
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Button color="secondary" 
                                    onClick={()=>deleteRecipeFromCalendar(r)}>x</Button>
                                </Grid>
                            </Grid>
                        </div>
                    ): ""
                }
            </Box>
        </div>
        </ThemeProvider>
    )
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
        calendars: state.calendars
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteRecipeFromCalendar: (calendar) => dispatch(deleteRecipeFromCalendar(calendar)),
    }
  }
  
export default connect( mapStateToProps, mapDispatchToProps )(WeeklyRecipes);
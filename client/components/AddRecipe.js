import React from "react"
import {connect} from "react-redux"
import { Link } from 'react-router-dom';
import { createRecipe } from "../store"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddIngredients from './AddIngredients'
import AddInstructions from './AddInstructions'
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
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

class AddRecipe extends React.Component {
    constructor() {
        super()
        this.state = {
            recipe_name: '',
            cuisine: '',
            time: '',
            rating: '',
            ingredients: '',
            instructions: '',
            website_link: '',
            picture: '',
            servings: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleInstCallback = (childData) =>{
        this.setState({instructions: childData})
    }
    handleIngrCallback = (childData) =>{
        this.setState({ingredients: childData})
    }
    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }
    handleSubmit (ev) {
        ev.preventDefault()
        const recipe = {}
        this.props.createRecipe({...this.state})
        this.props.history.push('/recipes')
    }
    
    render() {
        const {recipe_name, cuisine, time, rating, ingredients, instructions, website_link, picture, servings} = this.state
        const { handleChange, handleSubmit } = this
     return (      
        <ThemeProvider theme={theme}>
        <div id="addRecipe">
            <Grid container direction="row" spacing={5} justifyContent="center">
            <Grid item xs={10} sm={10} md={5.5}>
            <Grid container direction="column" spacing={2} >
                <Grid item><h1>Add Recipe</h1></Grid>
                <Grid item>
                    <TextField 
                        label="Name" variant="outlined" size="small"
                        name='recipe_name' 
                        placeholder="name"
                        onChange={handleChange} 
                        value={recipe_name} 
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        label="Cuisine" variant="outlined" size="small"
                        name= 'cuisine' 
                        placeholder="cuisine"
                        onChange={handleChange} 
                        value={cuisine}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        label="Time" variant="outlined" size="small"
                        name="time"
                        placeholder="time (min)"
                        onChange={handleChange} 
                        value={time}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        label="Servings" variant="outlined" size="small"
                        name="servings"
                        placeholder="servings"
                        onChange={handleChange} 
                        value={servings}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        label="Rating" variant="outlined" size="small"
                        name="rating"
                        placeholder="rating"
                        onChange={handleChange} 
                        value={rating}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        label="Link" variant="outlined" size="small"
                        name="website_link"
                        placeholder="website"
                        onChange={handleChange} 
                        value={website_link}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        label="Picture" variant="outlined" size="small"
                        name="picture"
                        placeholder="picture"
                        onChange={handleChange} 
                        value={picture}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <p>Ingredients:</p>          
                    <AddIngredients  parentCallback = {this.handleIngrCallback} fullWidth/>
                    <p>Instructions:</p>
                    <AddInstructions  parentCallback = {this.handleInstCallback} fullWidth/>
                </Grid>
                <Grid item>
                    <Button color="secondary" variant="outlined" sx={{marginTop: 2}}onClick={handleSubmit}>
                        Add
                    </Button>
                </Grid>
            </Grid>
            </Grid>
                <Grid item xs={10} sm={10} md={5.5} sx={{marginTop:3}}>
                <Card>
                    <CardMedia
                        component="img"
                        className="recipe-image"
                        sx={{ height: 700 }}
                        image={"https://i.postimg.cc/1R2GGhqX/jonathan-borba-u-B7q7aip-U2o-unsplash.jpg"}
                    />
                </Card>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (recipe) => dispatch(createRecipe(recipe)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe)

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
import { createRecipe } from "../store"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddIngredients from './AddIngredients'
import AddInstructions from './AddInstructions'

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
    }

    render() {
        const {recipe_name, cuisine, time, rating, ingredients, instructions, website_link, picture, servings} = this.state
        const { handleChange, handleSubmit } = this
     return (      
        <div id="addRecipe">
            <form id="recipe-form" onSubmit={handleSubmit}>
                <input 
                    name='recipe_name' 
                    placeholder="name"
                    onChange={handleChange} 
                    value={recipe_name} 
                />
                <input 
                    name="cuisine" 
                    placeholder="cuisine"
                    onChange={handleChange} 
                    value={cuisine}
                />
                <input 
                    name="time" 
                    placeholder="time (min)"
                    onChange={handleChange} 
                    value={time}
                />
                <input 
                    name="servings" 
                    placeholder="servings"
                    onChange={handleChange} 
                    value={servings}
                />
                <input 
                    name="rating" 
                    placeholder="rating"
                    onChange={handleChange} 
                    value={rating}
                />
                <label>Ingredients:</label>
                <label>Instructions:</label>
                
                <input 
                    name="website_link" 
                    placeholder="link"
                    onChange={handleChange} 
                    value={website_link}
                />
                <input 
                    name="picture" 
                    placeholder="picture"
                    onChange={handleChange} 
                    value={picture}
                />
                 <button type='submit'> create </button>
            </form>      
            <p>Add Ingredients</p>          
            <AddIngredients  parentCallback = {this.handleIngrCallback}/>
            {ingredients}
            <p>Add Instructions</p>
            <AddInstructions  parentCallback = {this.handleInstCallback}/>
            {instructions}
        </div>
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


/*
<form>
                            <TextField 
                                name="ingredients"
                                label="Ingredient"
                                variant = "filled"
                                value={ingredients}
                            />
                            <IconButton>
                                <RemoveIcon/>
                            </IconButton>
                            <IconButton>
                                <AddIcon/>
                            </IconButton>
                        </div>
                    ))}
                </form>
*/
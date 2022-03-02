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
import {addToCalendar, addToGroceryList} from "../store"

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

class Calendar extends React.Component{

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }
    handleSubmit (ev) {
        ev.preventDefault()
        const recipe_id = document.getElementById(`recipe`).value
        const day = 'monday'
        this.props.addToCalendar(day, recipe_id)

        //find the recipe information
        const recipes = this.props.recipes
        const recipe = (recipes.filter(r => (r.id === recipe_id)))
        //get all of the ingredients from this recipes
        const items = (recipe[0].ingredients).split('/')
        items.forEach(i=>this.props.addToGroceryList(i,day,recipe_id))
    }
    render(){
    const { handleChange, handleSubmit} = this
     return (      
        <div id="calendar">
            <Grid container>
                <Grid item>
                    <form onSubmit={handleSubmit}>
                    <p>Monday</p>
                    <select onChange={handleChange} id="recipe">
                        <option key='Monday'>
                        </option>
                        {this.props.recipes
                            .map((recipe) => (
                        <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                        ))}
                    </select> 
                    <button type='submit'> update </button>
                    </form>
                </Grid>
            </Grid>
        </div>
     )
    }
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
        calendars: state.calendars
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCalendar: (day, recipe) => dispatch(addToCalendar(day, recipe)),
        addToGroceryList: (item, day, recipe) => dispatch(addToGroceryList(item, day, recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)

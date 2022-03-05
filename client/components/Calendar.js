import React from "react"
import {connect} from "react-redux"
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"
import {addToCalendar, addToGroceryList} from "../store"
import { GoogleLogin } from 'react-google-login'
import Button from '@mui/material/Button'
import WeeklyRecipes from "./WeeklyRecipes";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

const gapi = window.gapi

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
const SCOPES = "https://www.googleapis.com/auth/calendar"

const dayofWeek = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let curr = new Date 
console.log(curr.getDate())
let week = []
let nextweek = []

for (let i = 0; i < 7; i++) {
  let first = curr.getDate() - curr.getDay() + i 
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
  week.push(day)
}
for (let i = 7; i < 14; i++) {
    let first = curr.getDate() - curr.getDay() + i 
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
    nextweek.push(day)
  }
let display = 'this'
console.log(week)
console.log(nextweek)
console.log(display)

class Calendar extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {recipe_id: '' }
    }
    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }
    handleSubmit (ev) {
        ev.preventDefault()
        const recipe_id = ev.target.elements.recipe.value
        const day = ev.target.dataset.date
        //find the recipe information
        if(recipe_id){
           const recipes = this.props.recipes
            const recipe = (recipes.filter(r => (r.id === recipe_id)))
            const recipe_name = recipe[0].name
            this.props.addToCalendar(day, recipe_id, recipe_name)
            //get all of the ingredients from this recipes
            const items = (recipe[0].ingredients).split('/')
            items.forEach(i=>this.props.addToGroceryList(i,day,recipe_id))
            this.handleClick(day, recipe[0].name, recipe[0].id) 
        }
    }
    handleClick (day, recipe, id) {
        gapi.load('client:auth2', () => {
            console.log('loaded client')
            gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES,
            })
            gapi.client.load('calendar', 'v3', () => console.log("success"))
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {       
                var event = {
                  'summary': `Dinner: ${recipe}`,
                  'description': `http://localhost:8080/#/recipes/${id}`,
                  'start': {
                    'date': `${day}`,
                  },
                  'end': {
                    'date': `${day}`,
                  }
                }     
                var request = gapi.client.calendar.events.insert({
                  'calendarId': 'primary',
                  'resource': event,
                })     
                request.execute(event => {
                  console.log(event)
                  window.open(event.htmlLink)
                })
              })
        })
    }
    handleThisWeek (ev){
        display = 'this'
        console.log(display)
    }
    handleNextWeek (ev){
        display = 'next'
        console.log(display)
    }
    render(){
     const { handleChange, handleSubmit } = this      
     return (  
        <div id="calendar">
            <Card>
            <CardMedia
                image={"https://i.postimg.cc/rwngfyzX/pintando-la-luz-WGZv8-R05-LSo-unsplash.jpg"}
                className="individual_color_image"
                sx={{ height: "flex", minHeight:700}}
            >
             <CardContent>
            <Grid container direction="column" spacing={3}> 
                {week.map((date, i)=>(
                    <Grid item key={i} xs={12} sm={12} md={4}>
                        <b className="day_title">{dayofWeek[i]}: {date}</b>
                        <form onSubmit={handleSubmit} data-date={date} style={{paddingTop: 20}}>
                            <div className="custom-select">
                            <select onChange={handleChange} id="recipe" >
                                <option>Select Recipe</option>
                                {this.props.recipes
                                    .map((recipe) => (
                                <option key={recipe.id} value={recipe.id} data-recipe={recipe.id}>{recipe.name}</option>
                                ))}
                            </select> 
                            <button type='submit'> update </button>
                            </div>
                        </form>
                        <WeeklyRecipes day={date}/>
                        <Divider sx={{marginTop:3}}/>
                    </Grid>
                 ))}
            </Grid>
            </CardContent>
            </CardMedia>
        </Card>
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
        addToCalendar: (day, recipe, name) => dispatch(addToCalendar(day, recipe, name)),
        addToGroceryList: (item, day, recipe) => dispatch(addToGroceryList(item, day, recipe)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)


//<Button onClick={this.handleClick()}>Add Meal</Button>

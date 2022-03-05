import { connect } from 'react-redux'
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { fetchRecipesFromServer, fetchCalendarFromServer, fetchGroceryListFromServer } from '../store'
import Nav from './Nav';
import RecipeList from './RecipeList'
import SingleRecipe from './SingleRecipe';
import Calendar from "./Calendar"
import AddRecipe from './AddRecipe';
import GroceryList from './GroceryList'
import Home from "./Home"

class Main extends React.Component {
  componentDidMount(){
    this.props.fetchRecipesFromServer()
    this.props.fetchCalendarFromServer()
    this.props.fetchGroceryListFromServer()
  }

  render(){
    return (
      <Router>
        <div className="main">
          <Nav />
          <div className = "content">
            <Switch>
              <Route exact path= "/" component={Home} />
              <Route exact path="/recipes" component={RecipeList} />
              <Route exact path="/recipes/:id" component={SingleRecipe} />
              <Route exact path="/calendars" component={Calendar} />
              <Route exact path="/addRecipe" component={AddRecipe} />
              <Route exact path="/grocerylist" component={GroceryList} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipesFromServer: () => dispatch(fetchRecipesFromServer()),
    fetchCalendarFromServer: () => dispatch(fetchCalendarFromServer()),
    fetchGroceryListFromServer: () => dispatch(fetchGroceryListFromServer())
  };
};



export default connect(null, mapDispatchToProps)(Main)

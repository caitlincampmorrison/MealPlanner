import React, {Component} from "react";
import { connect } from "react-redux";
import {updateRecipeSort} from '../store'


class RecipeSort extends React.Component {   
    constructor(props) {
        super(props)
        this.state = {
            recipe_sort: props.recipe_sort
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange (ev) {
        ev.preventDefault()
        const recipe_sort = document.getElementById(`recipe_sort`).value
        this.props.updateRecipeSort({recipe_sort})
    }
    render(){ 
        const { handleChange } = this
        const sortOptions = ['Name', 'Time', 'Cuisine']
        return (
        <div>
            <select id="recipe_sort" onChange={handleChange}>
                {sortOptions.map((sortOption) => (
                    <option key={sortOption} value={sortOption}>{sortOption}</option>
                ))}
            </select>   
        </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        recipe_sort: state.recipe_sort
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRecipeSort: (recipe_sort) => dispatch(updateRecipeSort(recipe_sort))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeSort);
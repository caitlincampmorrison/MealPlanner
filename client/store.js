import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import loggerMiddleware from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
import GroceryList from "./components/GroceryList";

//ACTION TYPES
const FETCH_RECIPES_FROM_SERVER = "FETCH_RECIPES_FROM_SERVER"
const FETCH_CALENDAR_FROM_SERVER = "FETCH_CALENDAR_FROM_SERVER"
const FETCH_GROCERY_LIST_FROM_SERVER = "FETCH_GROCERY_LIST_FROM_SERVER"
const ADD_TO_CALENDAR = "ADD_TO_CALENDAR"
const ADD_TO_GROCERY_LIST = "ADD_TO_GROCERY_LIST"
const DELETE_ALL_GROCERY_LIST = "DELETE_ALL_GROCERY_LIST"
const DELETE_ITEM = "DELETE_ITEM"
const UPDATE_GROCERY_LIST = "UPDATE_GROCERY_LIST"
const CREATE_RECIPE = "CREATE_RECIPE"
const DELETE_RECIPE = "DELETE_RECIPE"
const DELETE_RECIPE_FROM_CALENDAR = "DELETE_RECIPE_FROM_CALENDAR"
const SET_UNIQUE_GROCERY_ITEMS = "SET_UNIQUE_GROCERY_ITEMS"
const UPDATE_RECIPE_SORT = "UPDATE_RECIPE_SORT"

//ACTION CREATORS
export const setUniqueGroceryItem = (unique) => ({
    type: SET_UNIQUE_GROCERY_ITEMS,
    unique,
});
export const updateRecipeSort = (recipe_sort) => ({
    type: UPDATE_RECIPE_SORT,
    recipe_sort
})

//THUNK ACTION CREATORS
export const fetchRecipesFromServer = () => {
    return async (dispatch) => {
      const { data } = await axios.get("/api/recipes");
      dispatch({ type: FETCH_RECIPES_FROM_SERVER, recipes: data });
    };
};

export const fetchCalendarFromServer = () => {
    return async (dispatch) => {
      const { data } = await axios.get("/api/calendars");
      dispatch({ type: FETCH_CALENDAR_FROM_SERVER, calendars: data });
    };
};

export const fetchGroceryListFromServer = () => {
    return async (dispatch) => {
      const { data } = await axios.get("/api/grocerylists");
      dispatch({ type: FETCH_GROCERY_LIST_FROM_SERVER, grocerylists: data });
    };
};

export const addToCalendar = (day, recipe, name) => {
    return async(dispatch) => {
        const { data } = await axios.post('/api/calendars/add', {day, recipe, name})
        dispatch({ type: ADD_TO_CALENDAR, calendars: data })
    }
}

export const addToGroceryList = (item, day, recipe) => {
    return async(dispatch) => {
        const { data } = await axios.post('/api/grocerylists', {item, day, recipe})
        dispatch({ type: ADD_TO_GROCERY_LIST, grocerylists: data })
    }
}

export const updateGroceryList = (item) => {
    return async (dispatch) => {
        item = (await axios.put(`/api/grocerylists/${item.id}`, item)).data
        dispatch(fetchGroceryListFromServer())
    }
}

export const deleteAllGroceryList = () => {
    return async (dispatch) => {
      const {data} = await axios.delete(`/api/grocerylists`);
      dispatch({ type: DELETE_ALL_GROCERY_LIST, grocerylists: data})
      dispatch(fetchGroceryListFromServer())
    };
}
export const deleteItem = (name, grocerylists) => {
    console.log(name)
    console.log(grocerylists)
    const find = grocerylists.filter(i => i.item === name.item)
    console.log(find)
    const item_id = find[0].id
    return async (dispatch) => {
      let data
      {find.forEach((i) => (data = axios.delete(`/api/grocerylists/${i.id}`)))
            dispatch({ type: DELETE_ITEM, item: item_id })
            dispatch(fetchGroceryListFromServer())
       }
    };
}

export const createRecipe = ( recipe ) => {
    console.log(recipe)
    return async (dispatch) => {
        const { data } = await axios.post('/api/recipes', recipe )
        dispatch(fetchRecipesFromServer())
    }
}

export const deleteRecipe = (recipe) => {
    return async (dispatch) => {
      const data = await axios.delete(`/api/recipes/${recipe.id}`);
      dispatch({ type: DELETE_RECIPE, recipe: recipe.id })
      dispatch(fetchRecipesFromServer())
    };
}
export const deleteRecipeFromCalendar = (calendar) => {
    return async (dispatch) => {
      const data = await axios.delete(`/api/calendars/${calendar.id}`);
      dispatch({ type: DELETE_RECIPE_FROM_CALENDAR, calendar: calendar.id })
      dispatch(fetchGroceryListFromServer())
      dispatch(fetchRecipesFromServer())
      dispatch(fetchCalendarFromServer())
    };
}

//INITIAL STATE
const initialState = {
    recipes: [],
    calendars: [],
    grocerylists: [],
    unique: [],
    movedarray: [],
    recipe_sort: {recipe_sort: "Name"}
};

//REDUCER
const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case FETCH_RECIPES_FROM_SERVER:
            return { ...state, recipes: action.recipes}
        case FETCH_CALENDAR_FROM_SERVER:
            return { ...state, calendars: action.calendars}
        case FETCH_GROCERY_LIST_FROM_SERVER:
            return { ...state, grocerylists: action.grocerylists}
        case ADD_TO_CALENDAR:
            return { ...state, calendars: [...state.calendars, action.calendars]}
        case ADD_TO_GROCERY_LIST:
            return { ...state, grocerylists: [...state.grocerylists, action.grocerylists]}
        case UPDATE_GROCERY_LIST:
            return { ...state, item: action.item}
        case CREATE_RECIPE:
            return { ...state, recipe:[ ...state.recipes, action.recipes]}
        case DELETE_RECIPE:
            return { ...state, recipes: state.recipes.filter((recipe)=>recipe.id !== action.recipe)}
        case DELETE_ALL_GROCERY_LIST:
            return { ...state, grocerylists: action.grocerylists}
        case DELETE_ITEM:
            return { ...state, grocerylists: state.grocerylists.filter((item)=>item.id !== action.item)}
        case DELETE_RECIPE_FROM_CALENDAR:
            return {...state, calendars: state.calendars.filter((calendar)=>calendar.id !== action.item)}
        case SET_UNIQUE_GROCERY_ITEMS:
            return {...state, movedarray: action.unique}    
        case UPDATE_RECIPE_SORT:
            return { ...state, recipe_sort: action.recipe_sort}
        default: 
            return state
    }
}

//STORE
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, loggerMiddleware)))

export default store
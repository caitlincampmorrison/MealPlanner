import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import loggerMiddleware from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

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

//ACTION CREATORS

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

export const addToCalendar = (day, recipe) => {
    return async(dispatch) => {
        const { data } = await axios.post('/api/calendars/add', {day, recipe})
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
export const deleteItem = (item) => {
    return async (dispatch) => {
      const data = await axios.delete(`/api/grocerylists/${item.id}`);
      dispatch({ type: DELETE_ITEM, item: item.id })
      dispatch(fetchGroceryListFromServer())
    };
}

export const createRecipe = ( recipe ) => {
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


//INITIAL STATE
const initialState = {
    recipes: [],
    calendars: [],
    grocerylists: []
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
        default: 
            return state
    }
}

//STORE
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, loggerMiddleware)))

export default store
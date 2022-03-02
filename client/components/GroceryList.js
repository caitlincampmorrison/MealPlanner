import React from "react"
import {connect} from "react-redux"
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import { updateGroceryList, 
        addToGroceryList, 
        deleteAllGroceryList, 
        deleteItem } from "../store"

const GroceryList = ( { grocerylists, deleteItem, deleteAllGroceryList, addToGroceryList })  => { 
    return (      
        <div id="grocerylist">
            <h1>Grocery List</h1>
            {grocerylists ?
                <Box sx={{height:200}}>
                    {grocerylists.map((ing) => {
                        return(
                            <div key={ing.id}>
                                <p>{ing.item}</p> <button onClick={()=>deleteItem(ing)}>x</button>
                            </div>                       
                        )
                    })} 
                </Box>
                :
                <Box>
                    <div><p>Grocery List Empty</p></div>
                </Box>
            }          
            <Button onClick={()=>deleteAllGroceryList()}>Clear All</Button>
        </div>
     )
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
        calendars: state.calendars,
        grocerylists: state.grocerylists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      updateGroceryList: () => dispatch(updateGroceryList()),
      deleteAllGroceryList: () => dispatch(deleteAllGroceryList()),
      deleteItem: (item) => dispatch(deleteItem(item)),
      addToGroceryList: (item) => dispatch(addToGroceryList(item))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(GroceryList)

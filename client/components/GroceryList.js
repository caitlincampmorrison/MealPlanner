import React from "react"
import {connect} from "react-redux"
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateGroceryList, 
        addToGroceryList, 
        deleteAllGroceryList, 
        deleteItem,
        setUniqueGroceryItem
            } from "../store"
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const GroceryList = ( { grocerylists, deleteItem, deleteAllGroceryList, addToGroceryList })  => { 
    //only prints grocery items once 
    let unique = []
    const item_names = grocerylists.map(i => i.item)
    item_names.forEach(i => {
        if(!unique.includes(i)){
            unique.push(i)
        }
    })
    console.log(unique)
    /*const [groceryitems, updategroceryitems] = useState(unique);
      console.log(groceryitems)*/
    function handleOnDragEnd(result){
        const items = Array.from(unique)
        const [reordereditem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reordereditem)
        unique = Array.from(items)
        setUniqueGroceryItem(unique)
    }
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
        <div id="grocerylist">
            <Card>
            <CardMedia
                image={"https://i.postimg.cc/nzRykLn5/brooke-lark-08b-OYn-H-r-E-unsplash.jpg"}
                className="individual_color_image"
                sx={{ height: "flex" }}
            >
             <CardContent>
            <Grid container alignItems="center" direction="column" justifyContent="center">
                <Grid item><h1>Grocery List</h1> </Grid>
                <Grid item xs={12} sm={12} md={8} >
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="recipes">
                    {(provided) => (
                    grocerylists ?
                    <Grid container direction="column" alignItems="center"  {...provided.droppableProps} ref={provided.innerRef}>
                        {unique.map((ing, i) => {
                            return(
                                <Draggable key={i} draggableId={ing} index={i}>
                                {(provided) => (
                                <Grid item key={i}>
                                <Grid container  direction="row" alignItems="center" 
                                    {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} sx={{height:50}}
                                >
                                    <Grid item>{ing}</Grid>
                                    <Grid item><Button color="secondary" onClick={()=>deleteItem(ing, grocerylists)}>x</Button></Grid>
                                </Grid>  
                                </Grid>    
                                )}
                                </Draggable>                 
                            )
                        })} 
                        {provided.placeholder}
                    </Grid>
                    :
                    <Grid container>
                        <div><p>Grocery List Empty</p></div>
                    </Grid>
                )}            
                    </Droppable>
                </DragDropContext>
                </Grid> 
                <Grid item>        
                <Button variant="outlined" color="secondary" onClick={()=>deleteAllGroceryList()}>Clear All</Button>
                </Grid> 
            </Grid>
            </CardContent>
            </CardMedia>
        </Card>
        </div>
        </ThemeProvider>
     )
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
        calendars: state.calendars,
        grocerylists: state.grocerylists,
        unique: state.unique
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      updateGroceryList: () => dispatch(updateGroceryList()),
      deleteAllGroceryList: () => dispatch(deleteAllGroceryList()),
      deleteItem: (item, grocerylists) => dispatch(deleteItem(item, grocerylists)),
      addToGroceryList: (item) => dispatch(addToGroceryList(item)),
      setUniqueGroceryItem: (unique) => dispatch(setUniqueGroceryItem(unique))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(GroceryList)

import React from "react";
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

const Nav = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="common" sx={{ height: "60px" }}>
            <Box sx={{ display: { xs: "flex", sm: "flex", md: "flex" } }}> 
              <Link  to={`/recipes`}>
                <Typography
                      variant="p"
                      component="div"
                      sx={{
                        fontSize: "16px",
                        marginLeft: 1,
                        marginRight: 1,
                        marginTop: 2,
                      }}
                    >
                      RECIPES
                  </Typography>
                </Link>
                <Link  to={`/calendars`}>
                  <Typography
                        variant="p"
                        component="div"
                        sx={{
                          fontSize: "16px",
                          marginLeft: 1,
                          marginRight: 1,
                          marginTop: 2,
                        }}
                      >
                        CALENDAR
                    </Typography>
                </Link>
                <Link  to={`/grocerylist`}>
                  <Typography
                        variant="p"
                        component="div"
                        sx={{
                          fontSize: "16px",
                          marginLeft: 1,
                          marginRight: 1,
                          marginTop: 2,
                        }}
                      >
                        GROCERY LIST
                    </Typography>
                </Link>
                <Link  to={`/addRecipe`}>
                  <Typography
                        variant="p"
                        component="div"
                        sx={{
                          fontSize: "16px",
                          marginLeft: 1,
                          marginRight: 1,
                          marginTop: 2,
                        }}
                      >
                        ADD RECIPE
                    </Typography>
                </Link>
            </Box>       
        </AppBar>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  }
}


export default connect(mapStateToProps, null)(Nav);
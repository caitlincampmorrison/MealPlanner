import React from "react"
import {connect} from "react-redux"
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Home = ()  => {
    const theme = createTheme({
        palette: {
          primary: {
            light: "#fafbfe",
            main: "#edf2fb",
          },
          secondary: {
            main: "#ffffff",
          },
        },
      });
     return (      
        <ThemeProvider theme={theme}>
        <div id="home">
         <Card className="main_page_top">
          <CardMedia
            image={
              "https://i.postimg.cc/hjpJPYk9/todd-quackenbush-x5-SRhk-Fajr-A-unsplash.jpg"
            }
            className="home_page_image"
          >
            <CardContent>
              <Typography component="p">What do you want cook today?</Typography>
              <Box textAlign="center">
                <Link to={`/recipes`}>
                  <Button variant="outlined" color="secondary" size="large">
                    <Typography component="h1"> Lets Eat </Typography>
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </CardMedia>
        </Card>
        </div>
        </ThemeProvider>
     )
}


export default Home

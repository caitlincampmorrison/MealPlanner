const express = require('express')
const app = express.Router()
const{ Recipe } = require('../db')

app.get('/', async(req,res,next) => {
    try{
        res.send(await Recipe.findAll())
    }
    catch(ex){
        next(ex)
    }
})

app.get("/:id", async (req, res, next) => {
    try {
      res.send(await Recipe.findOne({
            where: {id: req.params.id}
      })
      );
    } catch (error) {
      next(error);
    }
});

app.post('/', async(req,res,next) => {
  try{
      const data = await Recipe.create({
        name: req.body.recipe_name, 
        ingredients: req.body.ingredients, 
        instructions: req.body.instructions,
        time: req.body.time,
        servings: req.body.servings,
        cuisine: req.body.cusine,
        link: req.body.website_link,
        picture: req.body.picture,
        rating: req.body.rating
      })
      res.send(data)
  }
  catch(ex){
      next(ex)
  }
})

app.delete('/:id', async(req,res,next) => {
  console.log("HERE")
  try{
      const data = await Recipe.destroy({
          where: {id: req.params.id}
      })
      res.sendStatus(204)
  }
  catch(ex){
      next(ex)
      console.log("error encountered")
  }
})

module.exports = app
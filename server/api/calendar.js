const express = require('express')
const app = express.Router()
const{ Calendar } = require('../db')

app.get('/', async(req,res,next) => {
    try{
        res.send(await Calendar.findAll())
    }
    catch(ex){
        next(ex)
    }
})

app.post('/add', async(req, res, next) => {
    try{
        const data = await Calendar.create({dayId: req.body.day, recipeId: req.body.recipe, recipeName: req.body.name})        
        res.send(data)
    }
    catch(ex){
        next(ex)
    }
})

app.delete('/:id', async(req,res,next) => {
    try{
        const data = await Calendar.destroy({
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
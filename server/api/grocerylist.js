const express = require('express')
const app = express.Router()
const{ GroceryList } = require('../db')

app.get('/', async(req,res,next) => {
    try{
        res.send(await GroceryList.findAll())
    }
    catch(ex){
        next(ex)
    }
})

app.post('/', async(req, res, next) => {
    try{
        const data = await GroceryList.create({item: req.body.item, dayId: req.body.day, recipeId: req.body.recipe})        
        res.send(data)
    }
    catch(ex){
        next(ex)
    }
})

app.put('/:id', async(req,res,next) => {
    try{
        const item = await GroceryList.findByPk(req.params.id)
        await item.update(req.body)
        await item.save()
        res.send(item)
    }
    catch(ex){
        next(ex)
        console.log("error encountered")
    }
})

app.delete('/', async(req,res,next) => {
    console.log(req.params.id)
    try{
        const data = await GroceryList.destroy({
            where: {}
        })
        res.sendStatus(204)
    }
    catch(ex){
        next(ex)
        console.log("error encountered")
    }
})

app.delete('/:id', async(req,res,next) => {
    try{
        const data = await GroceryList.destroy({
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
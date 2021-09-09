const Express = require ('express');
const Router = Express.Router();
const Checklist = require('../models/checklist')


Router.get('/' , (req,res) =>{
    console.log("Ola")
    res.send()
})

Router.post('/', async (req,res) =>{
    let {name} = req.body;
    try{
        let checklist = await Checklist.create({name})
        res.status(200).json(checklist)
    }catch(error){
        res.status(422).json(error)
    }


    res.status(200).json(req.body)
})

Router.get('/:id' , (req,res) =>{
    console.log(req.body["name"])
    res.send(`ID: ${req.params.id}`)
})


Router.put('/:id', (req, res) =>{
    console.log(req.params.id)
    res.send(`PUT ID: ${req.params.id}`)
})

Router.delete('/:id' , (req,res) =>{
    console.log(req.params.id)
    res.send(`DELETE ID: ${req.params.id}`)
})

module.exports = Router
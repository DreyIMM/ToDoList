const Express = require ('express');

const Router = Express.Router();
const Checklist = require('../models/checklist')


Router.get('/' , async (req,res) =>{
    try{
        let checklist = await Checklist.find({});
        res.status(200).json(checklist)
    }catch(error){
        res.status(422).json(error)
    }
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

Router.get('/:id' , async (req,res) =>{
    try{
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).json(checklist);
    }catch (error){
        res.status(422).json(error)
    }
})


Router.put('/:id', async(req, res) =>{
    let {name} = req.body
    try {
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true});
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)       
    }
})

Router.delete('/:id' , async (req,res) =>{
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)  
    }
})


module.exports = Router
const Express = require('express');
const checklist = require('../models/checklist');

const Router = Express.Router();
const Checklist = require('../models/checklist')


Router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/index', { checklists: checklists })
    } catch (error) {
        res.status(200).render('pages/error', { error: 'Erro ao exibir as listas' });
    }
})

Router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao carregar o formulario' })
    }
})

Router.get('/:id/edit', async(req, res) =>{
    try{
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', {checklist: checklist})
    }catch(error){
        res.status(500).render('pages/error', {error: 'Erro ao exibir a edição de listas de tarefas'})
    }
})

Router.post('/', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({ name })

    try {
        await checklist.save();
        res.redirect('/checkList');
    } catch (error) {
        res.status(422).render('checklists/new', { checklist: { ...checklist, error } })
    }
})

Router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/show', { checklist: checklist })
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao exibir as listas' });
    }
})

// Permite editar 
Router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist
    let checklist = await Checklist.findById(req.params.id)
    try {
        await checklist.updateOne({name});
        res.redirect('/checkList')
    } catch (error) {
        let errors = error.errors
        res.status(422).render('checklist/edit', {checklist: {...checklist, errors}})
    }
})

Router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})


module.exports = Router
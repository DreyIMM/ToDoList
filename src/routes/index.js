const express = require('express')
const Router = express.Router();

Router.get('/', async(req,res) =>{
    res.render('pages/index')
    
});

module.exports = Router 
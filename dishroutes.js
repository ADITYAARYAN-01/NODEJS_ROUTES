const express = require('express');
const routes = express.Router();
const DISH = require('../MODELorSCHEMA/DISH');

routes.post('/', async (req, res) => {
    try {
        const data = req.body;
        const Newdish = new DISH(data);
        console.log("data of dish have been saved");
        const response = await Newdish.save();
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error of dish' });
    }
})
routes.get('/', async (req, res) => {
    try {
        const data = await DISH.find();
        console.log(" data has been fetches");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal aerver error' });
    }
})
routes.get('/:flavours_asked', async (req, res) => {
    try {
        const flavours_asked = req.params.flavours_asked;
        if (flavours_asked == "Sweet" || flavours_asked == "Salty" || flavours_asked == "Spicy") {
            const response = await DISH.find({ flavours: flavours_asked });
            console.log("data has been fetched");
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: 'dish not found' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
module.exports = routes;
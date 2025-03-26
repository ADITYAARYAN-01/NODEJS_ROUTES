const express = require('express');
const router = express.Router();
const Person = require('../MODELorSCHEMA/Person');
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newperson = new Person(data);

        console.log('data saved');
        // console.log(newperson);
        const response = await newperson.save();

        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data mil gya");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
router.get('/:Worktype', async(req,res) =>{
    try{
        const Worktype = req.params.Worktype;
        if(Worktype == "Chef" || Worktype == "Waiter" || Worktype == "Halwai" || Worktype == "Manager" || Worktype == "Sweeper"){
            const response = await Person.find({work : Worktype});
            console.log("Data fetched");
            res.status(200).json(response);
        }
        else{
            console.log("not found");
            res.status(404).json({error: 'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal aerver error' });
    }
})
router.put('/:id' , async (req, res) => {
    try {
        const personid = req.params.id;
        const updatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(personid, updatePersonData ,{
            new: true, // Return the updated document
            runValidators: true // Validate the update against the schema
        });
        if(!response){
            console.log("not found");
            res.status(404).json({error: 'Invalid person id' });
        }
        else{
            console.log("updated");
            res.status(200).json(response);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
router.delete('/:id', async (req, res) => {
    try{
        const personid = req.params.id;
        const response = await Person.findByIdAndDelete(personid);
        if(!response){
            console.log("not found");
            res.status(404).json
        }
        else{
            console.log("deleted");
            res.status(200).json(response+"\ndeleted");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json
    }
})
module.exports = router;
const express = require('express');

const router = express.Router();

const Student = require('../MODELorSCHEMA/Student');

router.get('/',async(req,res)=>{
    try{
        const Data = await Student.find();
        console.log("Student data has been Fetched");
        res.status(200).json(Data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"});
    }
})
router.post('/',async(req,res)=>{
    try{
        const Data = req.body;
        const NewStudent = new Student(Data);
        const response = await NewStudent.save();
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"});
    }
})
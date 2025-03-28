const express = require('express');

const router = express.Router();

const Student = require('../MODELorSCHEMA/Students');

router.get('/', async (req, res) => {
    try {
        const Data = await Student.find();
        console.log("Student data has been Fetched");
        res.status(200).json(Data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})
router.post('/', async (req, res) => {
    try {
        const Data = req.body;
        const NewStudent = new Student(Data);
        const response = await NewStudent.save();
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }

})
router.put('/:STD_ID', async (req, res) => {
    try {
        const Studentid = req.params.STD_ID;
        const updateStudentData = req.body;
        const response = await Student.findOneAndUpdate({ StudentID: Studentid }, updateStudentData,
            {
                new: true,
                runValidators: true
            });
        if (!response) {
            console.log("not found");
            res.status.apply(404).json({ error: 'invalid Student id' });
        }
        else {
            console.log("updated");
            res.status(200).json(response);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
module.exports = router;


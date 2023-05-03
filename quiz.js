const express = require("express");
const app = express();
const database = require('./connection');
const quizSchema = require("./quiz_table");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.post('/quizzes', async(req,res) => {
    try{
        const id = req.body.id;
        const Question = req.body.question;
        const Option = req.body.option;
        const rightAnswer = req.body.rightAnswer;
        const startDate = new Date(req.body.startdate);
        const endDate = new Date(req.body.enddate);
        const status = req.body.status;
        const quiz = new quizSchema({
            id: id,
            question: Question,
            option: Option,
            rightAnswer: rightAnswer,
            startDate: startDate,
            endDate: endDate,
            status: status
        });
        const result = await quiz.save();
        res.status(200).send(result);
    }
    catch{
        res.status(500).json({Message : "Please write correct paylaod"});
    }
});

app.get('/quizzes/active', async(req,res) => {
    try{
        const result = await quizSchema.find({status: "active"});
        if(result == null){
            res.status(401).json("Data Not Found");
        } else{
            const currentDate = new Date();
            const data = [];
            result.forEach(element => {
                let startDate = element.startDate;
                let endDate = element.endDate;
                if(currentDate<startDate){
                    element.status = "inactive";
                } else if(currentDate>=startDate && currentDate<=endDate){
                    element.status = "active";
                    data.push(element);
                } else{
                    element.status = "finished";
                }
            });
            res.status(200).json(data);
            console.log(result);
        }
    }
    catch{
        res.status(500).json(err);
    }

});

app.get('/quizzes/:id/result', async(req,res) =>{
    try{
        const id = req.params.id;
        const result = await quizSchema.find({id: id});
        if(result==null){
            res.status(404).json({Message: "Data not found"});
        } 
        else{
            const data = result[0].rightAnswer;
            res.status(200).json(data);
        }
    }
    catch{
        res.status(500).json({Message: "Something went wrong"});
    }
});

app.get('/quizzes/all', async(req,res) => {
    try{
        const result = await quizSchema.find();
        if(result==null){
            res.status(404).json({Message: "Please create quiz"});
        } 
        else{
            res.status(200).json(result);
        }
    }
    catch{

    }
})
module.exports = app;
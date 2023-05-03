const mongoose = require('mongoose');

const quiz = new mongoose.Schema({
    id:{
        type: Number,
        require: true
    },
    question:{
        type:String,
        unique: true
    },
    option:{
        type:Array,
        require: true
    },
    rightAnswer: {
        type:String,
        require:true
    },
    startDate: {
        type: Date,
        require:true
    },
    endDate:{
        type:Date,
        require: true
    },
    status:{
        type: String,
        require: true
    }
});

const QUIZ = new mongoose.model("quiz",quiz);

module.exports = QUIZ;
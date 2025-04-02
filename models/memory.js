const mongoose = require('mongoose')

const memorySchema = new mongoose.Schema({
    value: String,
    name: String,
    category: String,
})
const Memory = mongoose.model('Memory', memorySchema);

const resultSchema = new mongoose.Schema({
    name: String,
    percentage: Number,
    difficulty: String,
})
const Result = mongoose.model('Result', resultSchema);

module.exports = {Result, Memory}; // when its exported to Server.js it will come in as an object.
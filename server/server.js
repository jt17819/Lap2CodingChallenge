const express = require("express")
const cors = require("cors")
const server = express()
const mongoose = require("mongoose")
const router = express.Router()

// connect to db
mongoose.connect("mongodb+srv://codingchallenge2:codingchallenge2@cluster0.wnuva.mongodb.net/codingchallenge2?retryWrites=true&w=majority", {useNewUrlParser:true})
// hooks up some events when db is connected
const db = mongoose.connection

// schema of the data
const schema = mongoose.Schema
const postSchema = new mongoose.Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    body: {type:String, required:true}
}, {collection: "posts"})

const postData = mongoose.model("postData", postSchema)
db.on("connected", () => {console.log("connected to mongo")})

server.use(cors())
server.use(express.json())

server.get("/:id", function(req, res, next) {
    const id = req.params.id
    postData.findById(id, function(err,result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

server.get("/", function(req,res) {
    console.log("hi")
    postData.find({},function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
            console.log(result)
    }})
})

server.post("/insert", function(req, res, next) {
    console.log(req.body.title)
    let item = {title: req.body.title, author: req.body.author, body: req.body.body}
    let data = new postData(item)
    data.save() 
    res.status(201).json({message: "message"})
})

module.exports = server
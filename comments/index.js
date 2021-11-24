const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:ID/comments', (req,res) => {
    res.send(commentsByPostId[req.params.ID] || [])
})

app.post('/posts/:ID/comments', (req,res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body
    
    const comments = commentsByPostId[req.params.ID] || []
    comments.push({ id: commentId, content })
    commentsByPostId[req.params.ID] = comments

    res.status(201).send(comments)
})

app.listen(4001,() => {
    console.log("Listen on 4001")
})
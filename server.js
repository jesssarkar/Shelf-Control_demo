const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const req = require('express/lib/request')
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'testbase',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to Database')
        db = client.db(dbName)
        collection = db.collection('Cluster0')
    })
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/',(request, response)=>{
    db.collection('Cluster0').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/booklist', (req, res) => {
    collection.insertOne(
        {
          
                name: req.body.name,
                author: req.body.author,
                thumbnail: req.body.thumbnail,
                likes: 0
        },
    )
    .then(result => {console.log(result)
        res.json('Success')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteBook', (request, response) => {

    db.collection('Cluster0').deleteOne({name: request.body.name})
    .then(result => {
        console.log('Book Deleted')
        response.json('Book Deleted')
    })
    .catch(error => console.error(error))

})

app.put('/addOneLike', (request, response) => {
    db.collection('Cluster0').updateOne({name: request.body.name},{
        $set: {
            likes:request.body.likes + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))

})





app.listen(process.env.PORT || PORT, () =>{
    console.log('Server is Running')
})
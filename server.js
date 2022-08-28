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
    db.collection('Cluster0').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.put('/booklist', (req, res) => {
    collection.findOneAndUpdate(
        {name: ''},
        {
            $set: {
                name: req.body.name,
                author: req.body.author,
                thumbnail: req.body.thumbnail,
            }
        },
       {
        upsert: true
       }
    )
    .then(result => {console.log(result)
        res.json('Success')
    })
    .catch(error => console.error(error))
})



app.listen(process.env.PORT || PORT, () =>{
    console.log('Server is Running')
})
require('dotenv').config()
const { MongoClient } = require("mongodb");

const express = require('express')
const app = express()

let client = new MongoClient(`mongodb://localhost:27017`);

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.post("/create/:db/:coll", async (req, res) => {
  let newEntry = req.body
  newEntry.copies ? newEntry.copies = parseInt(req.body.copies) : undefined

  let libColl = await dbConnect(req.params.db, req.params.coll)
  await libColl.insertOne(newEntry)

  client.close()

  res.redirect('/')
})

app.get('/bookdata', async (req, res) => {
  let bookColl = await dbConnect("test", "library")

  let cursor = await bookColl.find({})

  let results = []

  await cursor.forEach(book => {
    results.push(book)
  })

  res.json(results)
})

async function dbConnect(dbName, collName) {
  
  await client.connect()

  let database = await client.db(dbName)

  let coll = await database.collection(collName);

  return coll
}


app.listen(process.env.PORT || 5000, () => {
  console.log('server is running')
})

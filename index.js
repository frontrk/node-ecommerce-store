require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5000

mongoose.connect(`mongodb://${process.env.DB_HOST}`,{
    useUnifiedTopology: true,
    useNewUrlParser: true
 })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to db'))

app.use(express.json())

const product = require('./routes/product')
const category = require('./routes/category')

app.use('/product', product)
app.use('/category', category)

app.listen(port, () => {`server is running on port: ${port}`})
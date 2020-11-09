require('dotenv').config()
const fs = require('fs')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5000
const cors = require('cors')


mongoose.connect(`mongodb://${process.env.DB_HOST}`,{
    useUnifiedTopology: true,
    useNewUrlParser: true
 })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to db'))

app.use(cors())
app.use(express.json())

fs.readdir("./routes", (err, files) => {
    files.forEach(file => {
        const name = file.substr(0, file.indexOf('.'));
        app.use(`/${name}`, require(`./routes/${file}`))
    });
})


app.listen(port, () => { console.log(`server is running on port: ${port}`) })
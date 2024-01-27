const express = require('express')
const port = 5000
const helmet = require('helmet')
const router = require('./routes/controller.js')
const cors = require("cors")
var bodyParser = require('body-parser')
const app = express()
app.use(helmet())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors())
 //ROUTES
app.use('/chucknorris',router)

app.listen(port,function(){
	console.log('listening to port ' + port);
})
let express = require('express');
let bodyParser = require('body-parser')
let router = require('./router')
let fs = require('fs')

const app = express();

const middleware = [
    express.static('public'),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
];

app.use(middleware)
express.static('public')
app.use('/', router)

//Failsafe for unauthorized pages
app.use((req, res, next) => {
    res.status(404).json({
        code: "404",
        reason: "Page Not Found",
        description: "The page you are looking for does not exist."
    })
})

app.listen(8080)
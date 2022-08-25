const express = require('express');
const morgan = require('morgan');

// app will = express()
const app = express();

app.use(function(req, res, next) {
res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, HEAD, GET, PUT, POST, DELETE'
);
res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
);
next();
})
app.use(morgan('tiny'))
app.use(express.static('./server/assets'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(__dirname + '/'))

// importing routes from index.js
const indexRoutes = require("./Routes/index")

const PORT = 4000;

// adding /api in front of routes
app.use('/api', indexRoutes);

app.listen(PORT, () => console.info(`Listening on port ${PORT}`))
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});
 
console.log(mongoose.connection.readyState);

mongoose.connection.on('connected', () => {
    console.log('connected to db' + config.database);
})

mongoose.connection.on('error', (err) => {
    console.log('db error' + err);
})

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users)

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

app.listen(port, () => {
    console.log('server started on port ' + port);
});


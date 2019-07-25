require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const session = require('express-session');

const app = express();

mongoose.connect('mongodb+srv://developer:fIzG8qbALJjSfC8V@api-3jify.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose
    .connection
        .once('open', () => {console.log('Sucefull database attachment.');})
            .on('error', (error) => {console.log('Error is: ', error);})
requireDir('./src/models');

app.use(
    session({
        secret: 'cdcm4n4g3r',
        reserve: true,
        saveUninitialized: true
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());    

app.use(require('./src/routes'));

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running at PORT ${PORT}.`));

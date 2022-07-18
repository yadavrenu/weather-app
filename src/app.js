const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weatherForecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

// Set up static directory to use
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    // res.send('Hello Express');
    res.render('index', {
        title : 'Weather App',
        name : 'Renu Yadav'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message : 'Some help',
        title : 'Help',
        name : 'Renu Yadav'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name : 'Renu',
        title : 'About'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Please provide address'
        });
    }
    geocode(req.query.address, (error, {lat, long, name} = {}) => {
        if(error) {
           return res.send({ error });
        }
        weather(lat, long, (error, {temperature, observation_time} = {}) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                data : `The temperature is ${temperature} at ${name}, ${observation_time}`
            });
        })
    });
});

app.get('*', (req, res) => { //wild card
    res.send('404 Page');
})
app.listen(port, () => {
    console.log('Server is up at port ' + port);
});
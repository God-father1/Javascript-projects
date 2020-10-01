const express = require('express');
const app = express();
const path = require('path');
const request = require('request');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {

    request('https://api.covid19india.org/data.json', (error, response, body) => {

        if (error) {
            console.log(error);
        }
        let data = JSON.parse(body);
        res.render('index', { data: data });
    });

});

app.get('/index', (req, res) => {

    request('https://api.covid19india.org/data.json', (error, response, body) => {

        if (error) {
            console.log(error);
        }
        let data = JSON.parse(body);
        res.render('index', { data: data });
    });

});

app.get('/district', (req, res) => {

    request('https://api.covid19india.org/v2/state_district_wise.json', (error, response, body) => {

        if (error) {
            console.log(error);
        }
        let wise = JSON.parse(body);
        res.render('district', { data: wise });
    });
});

app.get('/world', (req, res) => {

    request('https://api.covid19api.com/summary', (error, response, body) => {

        if (error) {
            console.log(error);
        }
        let summary = JSON.parse(body);
        res.render('world',{ summary: summary } );
    });

});

app.get('/essential', (req, res) => {

    request('https://api.covid19india.org/resources/resources.json', (error, response, body) => {

        if (error) {
            console.log(error);
        }
        let data = JSON.parse(body);
        res.render('essential', { data1: data });
    });

});

app.listen('80', () => {
    console.log('Server Started at port 80');
});




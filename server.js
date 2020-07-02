const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('projects/weather-journal-app/website'));

const port = 8000;
app.listen(port, listening);

//Empty JS object as endpoint for all routes; initiated in the file server.js to act as the app API endpoint.
const weatherObj = {};

const projectData = [];
app.get('/retrieve', getData);
app.post('/add', postData);
app.get('/all', updateData)

/** ------------------------Defining Functions------------------------*/
function listening() {
    console.log(`The server is running on localhost ${port}`);
}

//GET route to return the JS object created at the top of server code
function getData(req, res) {
    res.send(weatherObj);
}

//POST route adds new entry to the server
function postData(req, res) {
    const newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        user_response: req.body.user_response
    };
    projectData.push(newEntry);
    console.log(`posted: ${projectData}`);
}

//GET request
function updateData(req, res) {
    console.log(`updated data at server side is: ${projectData}`);
    res.send(projectData);
}
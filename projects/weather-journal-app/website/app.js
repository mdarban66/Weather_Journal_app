/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const apiKey = '&APPID=51154c16346f0637717951cefd7aa3d7'; //Your API key is 51154c16346f0637717951cefd7aa3d7
/*
- Please, use the endpoint api.openweathermap.org for your API calls
- i.e.  api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=51154c16346f0637717951cefd7aa3d7 */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';


/** -----------------------------------Defining Functions-------------------------------------------- */

//Function: runs when the generate button is clicked
function clicked() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getData(`${baseURL}${zip}${apiKey}`)
        .then(function(data) {
            postData('/add', { temperature: data.main.temp, date: newDate, user_response: feelings });
            updateUI();
        })

}

//Function: for routing & getting data from server
const getData = async function(url) {
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

//Function: for routing & posting data to the server
const postData = async function(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

//Function: for updating DOM with the last entry, that is retrieved from the app
const updateUI = async function() {
    const resp = await fetch('/all');
    try {
        const data = await resp.json();
        const i = data.length - 1;
        console.log(`Date of updated data is: ${data[i].date}`);
        document.getElementById('date').innerHTML = data[i].date;
        document.getElementById('temp').innerHTML = data[i].temperature;
        document.getElementById('content').innerHTML = data[i].user_response;

    } catch (error) {
        console.log('error', error);
    }
}


document.getElementById('generate').addEventListener('click', clicked);
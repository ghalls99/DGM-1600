// Use of import and export statements
import { countries } from './countries.js'

async function getAPIData(url) {

    try {
        let apiResponse = await fetch(url);
        // Make sure that we get successful response
        if (apiResponse.status >= 400) {
            let errorMessage = await apiResponse.json();
            let response = new ApiResponse(null, `${errorMessage.error}. The error status is: ${apiResponse.status}`);
            return response;
        }
        // Use of let variable
        // Object using constructors properly
        let response = new ApiResponse(await apiResponse.json());
        return response;
    } catch (error) {
        // catch any network errors
        let response = new ApiResponse(null, "The network failed to connect. Please try again.");
        return response;
    }
}

// Use of custom javascript objects
// Proper declaration of objects
class ApiResponse {
    constructor(data, error) {
        this.data = data;
        this.error = error;
        this.getPrettyError = function() {
            return `There was an error processing your request: ${this.error}`;
        }
    }
}

// Use of const
const getAge = async(input) => {
    // send the input to agify api
    // Use of strings using template literals
    return await getAPIData(`https://api.agify.io?name=${input}`);
}

const getNationality = async(input) => {
    // send the input to the nationalize api
    return await getAPIData(`https://api.nationalize.io/?name=${input}`);
}

function changeCountryName(countryCode) {
    let country = countryCode;
    countries.forEach((item) => {
        // Use of objects with key value pairs
        if (Object.getOwnPropertyNames(item)[0] === countryCode) {
            country = Object.values(item)[0];
        }
    });
    return country;
}

// Use of arrow functions
const displayProbabilty = (nationalityResponse) => {
    // Get our table for our results
    let table = document.getElementsByClassName("nationality-data")[0];
    // flush any existing data in the table
    table.innerHTML = '';
    // Manipulate the array with Mars for fun
    // Use of arrays to store and manipulate collections of data
    let newCountry = { country_id: "Mars", probability: 0 };
    // Iteration through an array using loops and array methods
    nationalityResponse.country.push(newCountry);
    // loop through the array from the API response
    // Use of Arrays
    (nationalityResponse.country.forEach((item) => {
        // create a table row
        let tr = document.createElement('tr');
        // add the table to the table row
        console.log(changeCountryName(item.country_id));
        addTableData(tr, changeCountryName(item.country_id));
        addTableData(tr, `${Math.round(item.probability * 100)}%`);
        table.appendChild(tr);
    }));
    // shows results to the screen
    let showResults = document.getElementsByClassName('results')[0];
    showResults.classList.remove('hidden');
}

const displayAge = (ageResponse) => {
    // select the div to input into and display it to the page
    document.getElementsByClassName('age')[0].innerHTML = ageResponse.age;
}

const addTableData = (tr, data) => {
    // create table data element
    let td = document.createElement('td');
    // append data to the table data
    td.appendChild(document.createTextNode(data));
    // append table data to the table row
    tr.appendChild(td);
}

const displayError = (errorText) => {
    // displays the error message to the screen
    let div = document.getElementsByClassName('error')[0];
    div.innerHTML = errorText;
    div.classList.remove('hidden');
}

getResults.addEventListener('click', async(event) => {
    // prevent the form from reloading the page
    event.preventDefault();
    // select the name that the user provided
    let myName = document.getElementById('myName').value;
    myName = myName.trim();

    // clear and hide any previous errors
    let div = document.getElementsByClassName('error')[0];
    div.innerHTML = '';

    if (!validateForm(myName)) {
        return;
    }
    // display the name to the page
    document.getElementsByClassName('name')[0].innerHTML = myName;
    // take the name and send it to the agify api to get the results
    let ageResponse = await getAge(myName);
    if (ageResponse.error) {
        // Objects with properties and methods accessed using dot notaion
        displayError(ageResponse.getPrettyError());
        return;
    }
    // take the name and send it to the nationalize api to get the results
    let nationalityResponse = await getNationality(myName);
    if (nationalityResponse.error) {
        displayError(nationalityResponse.getPrettyError());
        return;
    }

    // display the results from the nationalize api to the screen
    displayProbabilty(nationalityResponse.data);
    // display the results from the agify api to the screen
    displayAge(ageResponse.data);

});

//Proper use of variables with proper scope
const validateForm = (name) => {
    let div = document.getElementsByClassName('error')[0];
    // hide any previous errors
    div.classList.add('hidden');
    if (!name) {
        displayError("Please provide your name");
        return false;
    }
    //Conditional logic and value comparision
    if (name.indexOf(' ') > 0) {
        displayError("Please provide your first name only");
        return false;
    }
    return true;
}
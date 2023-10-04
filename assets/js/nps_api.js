var baseURL = "https://developer.nps.gov/api/v1";
var apiKey = "GpXBVOoADabZe6DAWf2atfIHqSzsdyDMWejfa9rK";

function getStates() {
  const url =
    "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var options = '<option value="">Select a State</option>';
      for (const key in data) {
        options += `<option value=${key}>${data[key]}</option>`;
      }
    document.querySelector("#state-dropdown").innerHTML = options;
    //   getSelectedState();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getSelectedState() {
  document.querySelector("#state-dropdown")
}

document.querySelector('#search-form').addEventListener("submit", function (event) {
    event.preventDefault();
    console.log('hello-world');
    var stateSelect = document.querySelector("#state-dropdown").value;
    getParks(stateSelect);
  });
//${state}
function getParks(state) {
  const requestUrl = `${baseURL}/parks?q=Texas&api_key=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getParkActivites() {
  const requestUrl = `${baseURL}/activities/parks?api_key=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function getParkAlerts() {
  const requestUrl = `${baseURL}/alerts?api_key=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function getParkAmenities() {
  const requestUrl = `${baseURL}/amenities?api_key=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function getCampGrounds() {
  const requestUrl = `${baseURL}/campgrounds?api_key=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

getCampGrounds();
getStates();
getParks();
getParkAmenities();
getParkAlerts();
getParkActivites();

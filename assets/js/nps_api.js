var baseURL = "https://developer.nps.gov/api/v1";
var apiKey = "GpXBVOoADabZe6DAWf2atfIHqSzsdyDMWejfa9rK";
var campGrounds = [];

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
    })
    .catch(function (error) {
      console.log(error);
    });
}

document
  .querySelector("#search-state-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var stateSelect = document.querySelector("#state-dropdown").value;
    getParks(stateSelect);
  });

function getParks(state) {
  const requestUrl = `${baseURL}/parks?stateCode=${state}&api_key=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const parks = data.data.filter(function (item) {
        return item.fullName.toLowerCase().includes("park");
      });
      showParkDropdown(parks);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showParkDropdown(parks) {
  var options = '<option value="">Select a park</option>';
  for (const park of parks) {
    options += `<option value=${park.parkCode}>${park.fullName}</option>`;
  }
  document.querySelector("#park-dropdown").innerHTML = options;
}

document
  .querySelector("#search-park-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var park = document.querySelector("#park-dropdown").value;
    getCampGrounds(park);
  });

function getCampGrounds(park) {
  const requestUrl = `${baseURL}/campgrounds?parkCode=${park}&api_key=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.total == 0) {
        document.querySelector(".alert").textContent = "No campgrounds found! ";
      } else {
        showCampsDropdown(data.data);
      }
    });
}

function showCampsDropdown(camps) {
  campGrounds = camps;
  var options = '<option value="">Select a park</option>';
  for (const i in camps) {
    options += `<option value=${i}>${camps[i].name}</option>`;
  }
  document.querySelector("#camp-dropdown").innerHTML = options;
}

document
  .querySelector("#search-camps-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var index = document.querySelector("#camp-dropdown").value;
    console.log(campGrounds[+index])
    showCampInfo(campGrounds[+index]);
  });

function showCampInfo(camp) {
    const content = `
    <img src="${camp.images[0].url}" alt="${camp.images[0].altText}">
            <h3>Name: ${camp.name}</h3>
            <p>${camp.description}</p>`
    document.querySelector(".camp-info").innerHTML=content
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

getStates();

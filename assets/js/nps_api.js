var baseURL = "https://developer.nps.gov/api/v1";
var apiKey = "GpXBVOoADabZe6DAWf2atfIHqSzsdyDMWejfa9rK";
var mbapiKey =
  "pk.eyJ1IjoibXBmZWlmZXIxIiwiYSI6ImNsbjlhOTgwbTA0eTcybWxicHNoYzFlaTgifQ.rJIBDrbFLHr2CMnNCEtaeA";
var campGrounds = [];
var saveBtn = document.getElementById("save-btn");
var campname = 2;
var parkname = 1;

// fetched github url to get json file with state names and abbreviations to create state dropdown
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
// adds event listener to get the list of states value on search
document
  .querySelector("#search-state-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var stateSelect = document.querySelector("#state-dropdown").value;
    getParks(stateSelect);
  });

// fetched data from NPS API to get parks by state
function getParks(state) {
  const requestUrl = `${baseURL}/parks?stateCode=${state}&api_key=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var f = false;
      cards(data, f, parkname);
      const parks = data.data.filter(function (item) {
        return item.fullName.toLowerCase().includes("park");
      });
      showParkDropdown(parks);
    })
    .catch(function (error) {
      console.log(error);
    });
}
// generate dropdown list of park options
function showParkDropdown(parks) {
  var options = '<option value="">Select a park</option>';
  // loops through the object to generate list of park names
  for (const park of parks) {
    options += `<option value=${park.parkCode}>${park.fullName}</option>`;
  }
  document.querySelector("#park-dropdown").innerHTML = options;
}
// uses value from park name from dropdown to pass to get park campgrounds
document
  .querySelector("#search-park-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var park = document.querySelector("#park-dropdown").value;
    getCampGrounds(park);
  });
// call to get campground data for parks
function getCampGrounds(park) {
  const requestUrl = `${baseURL}/campgrounds?parkCode=${park}&api_key=${apiKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var f = false;

      cards(data, f, campname);
      if (data.total == 0) {
        //   document.querySelector(".alert").textContent = "No campgrounds found! ";
        // Modal; if response is 0 then modal appears
        // When User clicks close button modal disappears
        var modal = document.querySelector(".modal");
        // Back to Search Button for modal
        var closeButton = document.querySelector("#close-button");
        closeButton.addEventListener("submit", () => {
          modal.classList.remove("opacity-100");
          modal.classList.add("opacity-0");
          setTimeout(() => modal.classList.add("hidden"), 500);
        });
      } else {
        showCampsDropdown(data.data);
      }
    });
}
// create dropdown to show list of campgrounds
function showCampsDropdown(camps) {
  campGrounds = camps;
  var options = '<option value="">Select a campground</option>';

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
    console.log(campGrounds[+index]);
    showCampInfo(campGrounds[+index]);
    saveToLocalStorage(campGrounds[+index]);
  });

function showCampInfo(camp) {
  var t = true;
  cards(camp, t, campname);
}
// call to fetch park activities (future optimization option)
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
// call to fetch park alerts and notifications (future optimization option)
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
// call to fetch park amenities (future optimization option)
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
// stores searched history for campgrounds by name
function saveToLocalStorage(data) {
  var searchedCampSites =
    JSON.parse(localStorage.getItem("searchedCampSites")) || [];
  searchedCampSites.push(data.name);
  console.log("data", searchedCampSites);
  localStorage.setItem("searchedCampSites", JSON.stringify(searchedCampSites));
}
saveBtn.addEventListener("click", saveToLocalStorage);

async function load_map(long, lat) {
  // change parkLong and parkLat to call API data of Long and Lat
  // emptying string to populate map

  var parkLong = long;
  var parkLat = lat;
  // change map marker color by changing f60404 in URL, can change size of map image by replacing 400x300
  var testURL =
    "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+f60404(" +
    parkLong +
    "," +
    parkLat +
    ")/" +
    parkLong +
    "," +
    parkLat +
    ",7,0/400x300?access_token=" +
    mbapiKey;

  var url = testURL;
  const options = {
    method: "GET",
  };
  let response = await fetch(url, options);
  if (response.status === 200) {
    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    const image = document.createElement("img");
    image.src = imageObjectURL;
    const container = document.getElementById("map-container");
    container.append(image);
  } else {
    console.log("HTTP-Error: " + response.status);
  }
}

getStates();
// creates variable cards that fill screen with search data. 
function cards(data, tf, nameStyle) {
  var main = document.querySelector("main");
  main.innerHTML = "";
  // single card response
  if (tf == true) {

    main.setAttribute("class", "flex columns-3 m-2");

    var div = document.createElement("div");
    div.setAttribute("class", "max-w-sm overflow-hidden bg-[#005500] mb-8");
    main.appendChild(div);

    var img = document.createElement("img");
    img.setAttribute("class", "w-full");
    if (data.images[0] === undefined) {
      img.setAttribute("src","https://daily.jstor.org/wp-content/uploads/2016/10/Moving_Forest_1050_700.jpg");
    } else {
      img.setAttribute("src", data.images[0].url);
    }
    img.setAttribute("alt", "Picture of destination");
    div.appendChild(img);

    var p = document.createElement("p");
    p.setAttribute("class", "text-[#decd87] text-base mt-4 ml-2");
    p.textContent = data.description;
    div.appendChild(p);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "px-6 pt-4 pb-2");
    div.appendChild(div3);
    // second column of data 
    var section2 = document.createElement("div");
    section2.setAttribute("class","max-w-sm overflow-hidden bg-[#005500] mb-8");
    main.appendChild(section2);

    var div4 = document.createElement("div");
    div4.setAttribute("class", "px-6 py-4");
    section2.appendChild(div4);

    var div4a = document.createElement("div");
    div4a.setAttribute("class", "font-bold text-xl mb-2");
    div4a.textContent = data.name;
    div4.appendChild(div4a);

    var mp = document.createElement("p");
    mp.setAttribute("class", "text-[#decd87] text-base row");
    mp.textContent = data.audioDescription;
    section2.appendChild(mp);
    // third column of data
    var section3 = document.createElement("div");
    section3.setAttribute("class", "max-w-sm overflow-hidden bg-[#005500] mb-8");
    main.appendChild(section3);

    var p3 = document.createElement("p");
    p3.setAttribute("class", "text-[#decd87] text-base mt-4 ml-2");
    p3.textContent = data.reservationInfo;
    section3.appendChild(p3);

    var p4 = document.createElement("p");
    p4.setAttribute("class", "text-blue-700 text-base mt-4 ml-2");
    var a = document.createElement("a");
    a.setAttribute("href", data.reservationUrl);
    a.textContent = "get your reservation here";
    p4.appendChild(a);
    section3.appendChild(p4);

    var p5 = document.createElement("p");
    p5.setAttribute("class", "text-blue-700 text-base mt-4 ml-2 mb-2");
    var a2 = document.createElement("a");
    a2.setAttribute("href", data.directionsUrl);
    a2.textContent = "get directions here";
    p5.appendChild(a2);
    section3.appendChild(p5);

    var mapdiv = document.createElement("div");
    mapdiv.setAttribute("src", load_map(data.longitude, data.latitude));
    mapdiv.setAttribute("id", "map-container");
    mapdiv.setAttribute("class", "object-bottom");
    section3.appendChild(mapdiv);
    // multiple card response
  } else {
    main.setAttribute("class", "flex flex-wrap gap-8 columns-3 m-2");
    for (var i = 0; i < data.data.length; i++) {
      console.log(i);

      var div = document.createElement("div");
      div.setAttribute("class","max-w-sm rounded overflow-hidden shadow-lg bg-[#005500] mb-8");
      main.appendChild(div);

      var div2 = document.createElement("div");
      div2.setAttribute("class", "px-6 py-4");
      div.appendChild(div2);

      var div2a = document.createElement("div");
      div2a.setAttribute("class", "font-bold text-xl mb-2");
      // switches between park name and campground name depending on the data
      if (nameStyle == 1) {
        div2a.textContent = data.data[i].fullName;
      } else {
        div2a.textContent = data.data[i].name;
      }
      div2.appendChild(div2a);

      var img = document.createElement("img");
      img.setAttribute("class", "w-full");
      // uses base image if data does not have a image
      if (data.data[i].images[0] === undefined) {
        img.setAttribute("src","https://daily.jstor.org/wp-content/uploads/2016/10/Moving_Forest_1050_700.jpg");
      } else {
        img.setAttribute("src", data.data[i].images[0].url);
      }
      img.setAttribute("alt", "Picture of destination");
      div.appendChild(img);

      var p = document.createElement("p");
      p.setAttribute("class", "text-[#decd87] text-base row");
      p.textContent = data.data[i].description;
      div.appendChild(p);

      var div3 = document.createElement("div");
      div3.setAttribute("class", "px-6 pt-4 pb-2");
      div.appendChild(div3);
    }
  }
}

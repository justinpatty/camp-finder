var mbapiKey = 'pk.eyJ1IjoibXBmZWlmZXIxIiwiYSI6ImNsbjlhOTgwbTA0eTcybWxicHNoYzFlaTgifQ.rJIBDrbFLHr2CMnNCEtaeA';

async function load_map() {
// change parkLong and parkLat to call API data of Long and Lat
    var parkLong = "-91.3085"
    var parkLat = "34.0039"
    var adlpinLong = "-91.8"
    var adlpinLat = "34.5"
// change map marker color by changing f60404 in URL, can change size of map image by replacing 400x300
    var mbapiURL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+f60404(' + parkLong + ',' + parkLat + ', + adlpinLong + ',' + adlpinLat )/' + parkLong + ',' + parkLat + ',7,0/400x300?access_token=' + mbapiKey;

    var url = mbapiURL

    const options = {
        method: "GET"
    }
    let response = await fetch(url, options)
    if (response.status === 200) {
        const imageBlob = await response.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob);
        const image = document.createElement('img')
        image.src = imageObjectURL
        const container = document.getElementById("map-container")
        container.append(image)
    }
    else {
        console.log("HTTP-Error: " + response.status)
    }
}

// add call to search function
load_map()



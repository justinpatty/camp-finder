// pk.eyJ1IjoibXBmZWlmZXIxIiwiYSI6ImNsbjlhOTgwbTA0eTcybWxicHNoYzFlaTgifQ.rJIBDrbFLHr2CMnNCEtaeA
// API key for mapbox 

// 
// API key for nps 

 var main = document.querySelector("main");


for (var i = 0; i < 15; i++) {
    console.log(i);
    var div = document.createElement("div");
    div.setAttribute("class","max-w-sm rounded overflow-hidden shadow-lg bg-green-500 mb-8");
    main.appendChild(div);
    
    var img = document.createElement('img');
    img.setAttribute("class", "w-full");
    img.setAttribute("src", "https://media.tenor.com/JgPFGWYaS_8AAAAM/thisistheonedude123-bears.gif");
    img.setAttribute("alt", "Picture of destination");
    div.appendChild(img);
   
    var div2 = document.createElement("div");
    div2.setAttribute("class","px-6 py-4");
    div.appendChild(div2);

    var div2a = document.createElement("div");
    div2a.setAttribute("class","font-bold text-xl mb-2");
    div2a.textContent = "park location";
    div2.appendChild(div2a);

    var p = document.createElement("p");
    p.setAttribute("class","text-gray-700 text-base");
    p.textContent = " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.";
    div2.appendChild(p);

    var div3 = document.createElement("div");
    div3.setAttribute("class","px-6 pt-4 pb-2");
    div.appendChild(div3);
}
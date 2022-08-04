// const config = require('./api')
let input;
let cities;
const temp_small = document.getElementById('degree_small');
const temp_large = document.getElementById('degree_large');
const place_name_small = document.getElementById('place_small');
const place_name_large = document.getElementById('place_large');
const time_small = document.getElementById('time_small');
const time_large = document.getElementById('time_large');
const day_small = document.getElementById('day_small');
const day_large = document.getElementById('day_large');
const date_small = document.getElementById('date_small');
const date_large = document.getElementById('date_large');
const month_small = document.getElementById('month_small');
const month_large = document.getElementById('month_large');
const year_small = document.getElementById('year_small');
const year_large = document.getElementById('year_large');
const weather_name_small = document.getElementById('weather_name_small');
const weather_name_large = document.getElementById('weather_name_large');
const cloud_small = document.getElementById('cloud_small');
const cloud_large = document.getElementById('cloud_large');
const humidity_small = document.getElementById('humidity_small');
const humidity_large = document.getElementById('humidity_large');
const wind_small = document.getElementById('wind_small');
const wind_large = document.getElementById('wind_large');
const form1 = document.getElementById('form1');
const formLarge = document.getElementById('form1Large');
const ulSmall = document.getElementById("city_ul_small");
const ulLarge = document.getElementById("city_ul_large");
const search_button_small = document.getElementById("button_color_small");
const search_button_large = document.getElementById("button_color_large");


//31c3cdeea4869ee00e5589a3b2aa6aab

window.onload = async (event) => {
    cloud_small.innerHTML = 50+"%"
    cloud_large.innerHTML = 50+"%"

    getWeather('New Delhi','in');
    $(document).ready(function(){
        var classCycle=['imageCycle1','imageCycle2','imageCycle3','imageCycle4','imageCycle7','imageCycle8'];
    
        var randomNumber = Math.floor(Math.random() * classCycle.length);
        var button_color_small= document.getElementById("button_color_small");
        var button_color_large= document.getElementById("button_color_large");
        console.log(randomNumber);
        if(randomNumber==0){
            button_color_small.style.backgroundColor = "#0d6efd";
            button_color_large.style.backgroundColor = "#0d6efd";
        }else if(randomNumber==1){
            button_color_small.style.backgroundColor = "#2C3639";
            button_color_large.style.backgroundColor = "#2C3639";
        }
        else if(randomNumber==2){
            button_color_small.style.backgroundColor = "#1A1D24";
            button_color_large.style.backgroundColor = "#1A1D24";
        }
        else if(randomNumber==3){
            button_color_small.style.backgroundColor = "#191E29";
            button_color_large.style.backgroundColor = "#191E29";
        }
        
        else if(randomNumber==4){
            button_color_small.style.backgroundColor = "#FF7615";
            button_color_large.style.backgroundColor = "#FF7615";
        }
        else{
            button_color_small.style.backgroundColor = "#0F3D3E";
            button_color_large.style.backgroundColor = "#0F3D3E";
        }
        var classToAdd = classCycle[randomNumber];
        
        $('body').addClass(classToAdd);
    
    });

    readTextFile("./js/cities.json",function(text){
        cities = JSON.parse(text);
        console.log(cities);  
        showInitialCities();
    })
}

function setData(data){
    const temp = convertToCelcius(data.main.temp);
    const humidity = data.main.humidity;
    const cloud = data.clouds.all;
    const wind = data.wind.speed;
    temp_small.innerHTML = temp+'&#176';
    temp_large.innerHTML = temp+'&#176';
    humidity_small.innerHTML = humidity+"%";
    humidity_large.innerHTML = humidity+"%";
    cloud_small.innerHTML = cloud+"%";
    cloud_large.innerHTML = cloud+"%";
    wind_small.innerHTML = wind+"km/h";
    wind_large.innerHTML = wind+"km/h";
    place_name_small.innerHTML = data.name;
    place_name_large.innerHTML = data.name;
    weather_name_large.innerHTML = data.weather[0].main;
    weather_name_small.innerHTML = data.weather[0].main;
    // const icon = data.weather[0].icon.replaceAt(data.weather[0].icon.length-1,"n");
    // const src = "http://openweathermap.org/img/w/"+icon+".png";
    // console.log(src);
    // icon_small.src = src;
    // icon_large.src =src;

}


function convertToCelcius(temp){
    return (temp - 273.15).toFixed(0);
}

async function getWeather(city,country){
    if(city.length > 0){
        const weatherResponse = await fetch(config.base_url+'data/2.5/weather?q='+city+','+country+'&APPID='+config.apiKey);
        const data = await weatherResponse.json();
        console.log(data);
        setData(data);
    }
    
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const date = new Date();

// ✅ Get a String representing the given Date using UTC (= GMT) time zone.
// 👉️ "Fri, 14 Jan 2022 17:30:20 GMT"
var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
console.log(timeZone)
date.toLocaleString("en-US", {timeZone: timeZone})
//  const result = date.toUTCString();
//  console.log(result)
const day = (date.getMonth()+1);
console.log(date);
var d = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
const t = date.toString().split(" ");
console.log(t);
const hour = t[4].split(":")[0];
const min = t[4].split(":")[1];
time_large.innerHTML = hour+":"+min;
time_small.innerHTML = hour+":"+min;
day_large.innerHTML = "-"+t[0]+",";
day_small.innerHTML = "-"+t[0];
date_large.innerHTML = t[2];
date_small.innerHTML = t[2]+",";
month_large.innerHTML = t[1];
month_small.innerHTML = day;
year_large.innerHTML = t[3];
year_small.innerHTML = t[3];

form1.addEventListener('input', updateValue);
formLarge.addEventListener('input', updateValue);
function showInitialCities() {
    const i = "";
    const result = cities.filter(city => city.name.toLowerCase().includes(i.toLowerCase()));
    console.log(result);
    removeItems();
    let length;
    if(result.length>4){
        length = 4;
    }else{
        length = result.length;
    }
    for(let i = 0; i<length; i++){
        addCity(result[i]);
    }
}

function updateValue(e) {
    console.log(e);
    const i = e.target.value;
    //input=i;
    console.log(i);
    const result = cities.filter(city => city.name.toLowerCase().includes(i.toLowerCase()));
    console.log(result);
    removeItems();
    let length;
    if(result.length>4){
        length = 4;
    }else{
        length = result.length;
    }
    for(let i = 0; i<length; i++){
        addCity(result[i]);
    }

    if(length<4){
        const tempCities = cities.filter(city => !city.name.toLowerCase().includes(i.toLowerCase()));
        for(let i = 0; i<4-length; i++){
            addCity(tempCities[i]);
        }
    }

}
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function addCity(city) {
    const br = document.createElement("br");

    const liSmall = document.createElement("li");
    liSmall.classList.add("mt-4");
    liSmall.classList.add("fs-5");
    liSmall.classList.add("fw-bolder");
    liSmall.appendChild(document.createTextNode(city.name)); 
    liSmall.setAttribute('id','li_1');
    ulSmall.appendChild(liSmall);
    const liLarge = document.createElement("li");
    liLarge.classList.add("mt-4");
    liLarge.classList.add("fs-5");
    liLarge.classList.add("fw-bolder");
    liLarge.appendChild(document.createTextNode(city.name));
    liLarge.setAttribute('id','li_2');
    ulLarge.appendChild(liLarge);

    console.log(ulLarge);
    liLarge.addEventListener("click", function(){
        input = city.name
        formLarge.value =input
        getWeather(city.name,'in');
    });
    liSmall.addEventListener("click", function(){
        input = city.name
        form1.value =input
        getWeather(city.name,'in');
    });
}


function removeItems() {
  
    ulSmall.innerHTML = '';
    ulLarge.innerHTML = '';
}
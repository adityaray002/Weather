// const config = require('./api')
let input;
let cities;

const co = document.getElementById('CO');
const no = document.getElementById('NO');
const no2 = document.getElementById('NO2');
const o3 = document.getElementById('O3');
const so2 = document.getElementById('SO2');
const pm2 = document.getElementById('PM2_5');
const pm10 =document.getElementById('PM10');
const nh3 = document.getElementById('NH3');
const aqi = document.getElementById('AQI');

//31c3cdeea4869ee00e5589a3b2aa6aab

window.onload = async (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const lat = urlParams.get('lat');
    const lng = urlParams.get('lng');
    console.log(lat, lng);
    getAirQuality(lat, lng);
}

async function getAirQuality(lat, lon){
    const qualityResponse = await fetch(config.base_url+'data/2.5/air_pollution?lat='+lat+'&lon='+lon+'&APPID='+config.apiKey);
    const data2 = await qualityResponse.json();
    console.log(data2);

    setData2(data2)
}


async function getAirQuality(lat, lon){
    const qualityResponse = await fetch(config.base_url+'data/2.5/air_pollution?lat='+lat+'&lon='+lon+'&APPID='+config.apiKey);
    const data2 = await qualityResponse.json();
    setData2(data2);
}


function setData2(data2){
    console.log(data2.list[0]);
    //const co = document.getElementById('CO');
    co.innerHTML=data2.list[0].components.co;
    no.innerHTML=data2.list[0].components.no;
    no2.innerHTML=data2.list[0].components.no2;
    o3.innerHTML=data2.list[0].components.o3;
    so2.innerHTML=data2.list[0].components.so2;
    pm2.innerHTML=data2.list[0].components.pm2_5;
    pm10.innerHTML=data2.list[0].components.pm10;
    nh3.innerHTML=data2.list[0].components.nh3;
    const quality = data2.list[0].main.aqi;

    if(quality==1){
        aqi.innerHTML="GOOD";
        document.getElementById("AQI").style.backgroundColor='#79BC6A';
    }
    else if(quality==2){
        aqi.innerHTML="FAIR"
        document.getElementById("AQI").style.backgroundColor='#BBCE4C';
    }
    else if(quality==3){
        aqi.innerHTML="MODERATE"
       document.getElementById("AQI").style.backgroundColor='#EEC208';
    }
    else if(quality==4){
        aqi.innerHTML="POOR"
        document.getElementById("AQI").style.backgroundColor='#F29207';
    }else{
        aqi.innerHTML="VERY POOR"
        document.getElementById("AQI").style.backgroundColor='red';
    }

   // main.innerHTML=data2.list[0].main.aqi;

}


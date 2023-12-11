//          Random Background onload            //

let randomImg = document.getElementById ('randomBg');
images = ['Images/beach.jpg','Images/fall.jpg','Images/fog.jpg','Images/lake.jpg','Images/lavender.jpg','Images/lights.jpg','Images/mountains.jpg','Images/nature.jpg','Images/sea.jpg'];
//console.log(images)

let imgCount = images.length;
//console.log(imgCount)

let number = Math.floor(Math.random() * imgCount);
//console.log(number)

window.onload = function(){
    randomImg.style.backgroundImage = 'url(' +images[number]+')'
}



            //          Digital Clock & Date            //

function startTime() {
    let today = new Date();
    let hrs = (today.getHours()<10?"0":"") + today.getHours();
    let min = (today.getMinutes()<10?"0":"") + today.getMinutes();
    let sec = (today.getSeconds()<10?"0":"") + today.getSeconds();
    document.getElementById("clock").innerHTML = hrs + ":" + min + ":" + sec;

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let curWeekDay = days[today.getDay()];
    let curDay = today.getDate();
    let curMonth = months[today.getMonth()];
    let curYear = today.getFullYear();
    let date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
    document.getElementById("date").innerHTML = date;
    
    setTimeout(function(){ startTime() }, 1000);
}

startTime();


            //          Mousemove Animation event           //

let cursor = document.querySelector('#cursor');
let mouseStop;
document.addEventListener('mousemove', (coord) =>{
    let x = coord.pageX;
    let y = coord.pageY;

    cursor.style.top = y +'px';
    cursor.style.left = x +'px'
    cursor.style.display = 'block';
    // console.log(cursor)

    function mouseStopped(){
        cursor.style.display = 'none'
    }
    clearTimeout(mouseStop);
    mouseStop = setTimeout(mouseStopped, 1000);

});

document.addEventListener('mouseout', () => {
    cursor.style.display = 'none';
});




            //          Weather API App         ///

const apiKey = 'b724f5e05b05343ade627a52e8331175';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
let searchBox = document.querySelector('#search input');
let searchBtn = document.querySelector('#search button');
let weatherIcon = document.querySelector('#weather-icon');

async function checkWeather(city){
    const response = await fetch (apiURL + city + `&appid=${apiKey}`);
    let data = await response.json();

    // console.log(data);


    document.querySelector('#city').innerHTML = data.name;
    document.querySelector('#temp').innerHTML = Math.round(data.main.temp) + '℃';
    document.querySelector('#min-temp').innerHTML = Math.floor(data.main.temp_min) + '℃';
    document.querySelector('#humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('#wind').innerHTML = data.wind.speed + ' m/s';

    if(data.weather[0].main == 'Clear'){
        weatherIcon.src = 'Images/clear.png'
    }
    else if(data.weather[0].main == 'Clouds'){
        weatherIcon.src = 'Images/cloudy.png'
    }
    else if(data.weather[0].main == 'Drizzle'){
        weatherIcon.src = 'Images/drizzle.png'
    }
    else if(data.weather[0].main == 'Rain'){
        weatherIcon.src = 'Images/rain.png'
    }
    else if(data.weather[0].main == 'Snow'){
        weatherIcon.src = 'Images/snow.png'
    }
    else if(data.weather[0].main == 'Mist'){
        weatherIcon.src = 'Images/mist.png'
    }

    document.querySelector('#weather').style.display = 'block'
}

searchBtn.addEventListener('click', ()=> {
    checkWeather(searchBox.value);

});


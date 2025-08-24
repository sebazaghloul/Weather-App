


const navLinks=document.querySelectorAll(".nav-link")

navLinks.forEach(link=>  {

link.addEventListener("click",function(e) {

navLinks.forEach(l =>  l.classList.remove("active")); 

this.classList.add("active");

})

});

//                API part

const input = document.getElementById("inputCity");

input.addEventListener("input", () => {
  const city = input.value;
  if(city.length > 0) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const apiKey = "405c2d6cf90b46718ed125946252408"; 
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  const response = await fetch(url);
  const data = await response.json();

  const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  // ======== اليوم الحالي ========
  const today = data.forecast.forecastday[0];
  const dateObj = new Date(today.date);
  document.getElementById("cityDate1").innerText = `${daysOfWeek[dateObj.getDay()]}, ${dateObj.toLocaleDateString()}`;
  document.getElementById("cityName1").innerText = data.location.name;
  document.getElementById("cityTemp1").innerText = today.day.avgtemp_c + "°C";
  document.getElementById("cityWeather1").innerText = today.day.condition.text;
  document.getElementById("cityIcon1").src = "https:" + today.day.condition.icon;
  document.getElementById("cityWind1").innerHTML = `💨 ${today.day.maxwind_kph} km/h`;

  // ======== اليومين التاليين ========
  for (let i = 1; i <= 2; i++) {
    const forecast = data.forecast.forecastday[i];
    const date = new Date(forecast.date);
    const dayName = daysOfWeek[date.getDay()];

    document.getElementById(`dayName${i}`).innerText = dayName;
    document.getElementById(`dayDate${i}`).innerText = date.toLocaleDateString();
    document.getElementById(`dayTemp${i}`).innerText = forecast.day.avgtemp_c + "°C";
    document.getElementById(`dayIcon${i}`).src = "https:" + forecast.day.condition.icon;
    document.getElementById(`dayWeather${i}`).innerText = forecast.day.condition.text;
    document.getElementById(`dayWind${i}`).innerHTML = `💨 ${forecast.day.maxwind_kph} km/h`;
  }
}

// أول ما الصفحة تفتح
getWeather("Cairo");


// const input = document.getElementById("inputCity");
// const button = document.getElementById("searchBtn");

// button.addEventListener("click", () => {
//   let city = input.value;
//   getWeather(city);
// });


// async function getWeather(city) {
//   const apiKey = "405c2d6cf90b46718ed125946252408"; 
//   const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;


//   const response = await fetch(url);
//   const data = await response.json();
//   const cityDateEl = document.getElementById("cityDate1");

// // نجيب التوقيت من ال API
// const localTime = data.location.localtime; // "2025-08-24 21:30"

// // نحوله لـ Date
// const dateObj = new Date(localTime);

// // array صغيرة بأيام الأسبوع
// const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// // نجيب اليوم
// const dayName = days[dateObj.getDay()];

// // نعرض اليوم + التاريخ
// cityDateEl.innerText = `${dayName}, ${dateObj.toLocaleDateString()}`;

//   const cityNameEl = document.getElementById("cityName1");
//   cityNameEl.innerText = data.location.name;
  
//   const cityIconEl = document.getElementById("cityIcon1");
//   cityIconEl.src = "https:" + data.current.condition.icon;
  
  
//   const cityTempEl = document.getElementById("cityTemp1");
//   cityTempEl.innerText = data.current.temp_c + "°C";
  
//   const cityWeatherEl = document.getElementById("cityWeather1");
//   cityWeatherEl.innerText = data.current.condition.text;

//   const cityWindEl = document.getElementById("cityWind1");
//   cityWindEl.innerHTML = `<i class="fa-solid fa-wind"></i> ${data.current.wind_kph} km/h`;
 
  

// }  
// // أول ما الصفحة تفتح
// getWeather("Cairo");
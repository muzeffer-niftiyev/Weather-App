"use strict";

const body = document.querySelector("body");
const search = document.querySelector(".search");
const input = document.querySelector(".input");
const cityName = document.querySelector(".city");
const img = document.querySelector(".icon");
const temprature = document.querySelector(".temprature");
const description = document.querySelector(".description");
const dateLabel = document.querySelector(".date");
const error = document.querySelector(".error");
const container = document.querySelector(".container");
const loader = document.querySelector(".loader");

const date = new Date();
//prettier-ignore
const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];

const showDate = function () {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const weekday = Intl.DateTimeFormat("en", { weekday: "long" }).format(date);
  return `${weekday}, ${month} ${day}`;
};

showDate();

const weatherData = async function (city) {
  const api = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3965183bb80a18996c396c6944ea1989&units=metric`
  );
  const data = await api.json();

  if (api.ok) {
    cityName.textContent = data.name;
    const temp = Math.floor(data.main.temp);
    temprature.innerHTML = `<p class="temprature">${temp}&deg;</p>`;
    description.textContent = data.weather[0].main;
    dateLabel.textContent = showDate();
    body.append(container);
    container.classList.remove("hidden");
    error.innerHTML = "";

    if (data.weather[0].main === "Clear") {
      img.src = "https://cdn-icons-png.flaticon.com/512/3222/3222800.png";
    }
    if (data.weather[0].main === "Clouds") {
      img.src = "https://cdn-icons-png.flaticon.com/512/1850/1850730.png";
    }
    if (data.weather[0].main === "Rain") {
      img.src = "https://cdn-icons-png.flaticon.com/512/263/263883.png";
    }
    if (data.weather[0].main === "Snow") {
      img.src = "snow.png";
    }
    if (data.weather[0].main === "Haze") {
      img.src = "https://cdn-icons-png.flaticon.com/512/1779/1779807.png";
    }
  }

  if (!api.ok) {
    error.innerHTML = `Invalid city name, please try again!`;
    error.style.transform = "translateY(20px)";
    container.remove();
  }
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cityData = input.value;
    weatherData(cityData?.toLowerCase());
    input.value = null;
  }
});

import {
  displayWeather,
  displayUpcomingHours,
  displayUpcomingDays,
} from './dom';
import '../styles/main.css';

const searchBtn = document.querySelector('.searchBtn');
const useLocBtn = document.querySelector('.useLocation');

async function fetchWeather(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=a8e8cb073b3b467ba20153916261301&q=${city}&days=7`,
  );
  if (!response.ok) throw new Error('Failed to fetch weather: ', error);
  return response.json();
}

async function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const city = searchInput.value;

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  try {
    const weatherData = await fetchWeather(city);

    const upcomingHours = getUpcomingHours(weatherData);
    const upcomingDays = getUpcomingDays(weatherData);

    console.log(weatherData);
    displayWeather(weatherData);
    displayUpcomingHours(upcomingHours);
    displayUpcomingDays(upcomingDays);
  } catch (error) {
    console.error('Failed to fetch weather: ', error);
  }
}

searchBtn.addEventListener('click', handleSearch);

function getUpcomingHours(data) {
  const nowEpoch = data.current.last_updated_epoch;
  const todayHours = data.forecast.forecastday[0].hour;

  return todayHours.filter((hour) => hour.time_epoch > nowEpoch);
}

function getUpcomingDays(data) {
  return data.forecast.forecastday;
}

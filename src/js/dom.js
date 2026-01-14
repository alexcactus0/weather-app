const container = document.querySelector('.container');

export function Div(classname) {
  this.element = document.createElement('div');
  if (classname) this.element.classList.add(classname);
}

export function displayWeather(data) {
  const condition = data.current.condition;
  container.innerHTML = '';

  const headerCon = new Div('headerCon').element;
  const cityHeader = new Div('header').element;
  const cityName = new Div('cityName').element;
  cityName.textContent = data.location.name;

  const currentTemp = new Div('currentTemp').element;
  currentTemp.textContent = `${data.current.temp_c}°C`;

  const lineCon = new Div('lineCon').element;
  const line = new Div('line').element;
  lineCon.appendChild(line);

  const infoText = new Div('infoText').element;
  infoText.textContent = condition.text;

  cityHeader.append(cityName, currentTemp, lineCon, infoText);
  headerCon.appendChild(cityHeader);
  container.appendChild(headerCon);
}

export function displayUpcomingHours(hours) {
  const time = new Div('time').element;

  hours.slice(0, 5).forEach((hour) => {
    const hourContainer = new Div('hourContainer').element;
    const hours = new Div('hour').element;
    hours.textContent = hour.time.split(' ')[1];

    const hourIcon = new Div('hourIcon').element;
    const icon = document.createElement('img');
    icon.src = hour.condition.icon;

    hourIcon.appendChild(icon);

    const hourTemp = new Div('hourTemp').element;
    hourTemp.textContent = `${hour.temp_c}°C`;

    hourContainer.append(hours, hourIcon, hourTemp);
    time.appendChild(hourContainer);
    container.appendChild(time);
  });
}

export function displayUpcomingDays(days) {
  const week = new Div('week').element;

  days.forEach((day) => {
    const dayContainer = new Div('dayContainer').element;
    const theDay = new Div('day').element;
    const dayDate = day.date;
    const dayDateToName = getDayName(dayDate);
    theDay.textContent = dayDateToName;

    const dayIconCon = new Div('dayIcon').element;
    const dayIcon = document.createElement('img');
    dayIcon.src = day.day.condition.icon;
    dayIconCon.appendChild(dayIcon);

    const dayTempCon = new Div('dayTemp').element;
    dayTempCon.textContent = `${day.day.mintemp_c}°C - ${day.day.maxtemp_c}°C`;

    dayContainer.append(theDay, dayIconCon, dayTempCon);
    week.appendChild(dayContainer);
    container.appendChild(week);
  });
}

function getDayName(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
  });
}

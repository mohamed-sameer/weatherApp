/* Global Variables */
const url = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = '0eb0660ee0623a207ab55546d077ecd0';
const zipInput = document.getElementById('zip');
const btn = document.getElementById('generate');
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');
const userFeedback = document.getElementById('feelings');

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.toDateString();

// update html values
const updateView = async (path) => {
  const request = await fetch(path);
  try {
    const storedData = await request.json();
    // update html values with data retrieved from projectData object
    dateDiv.innerHTML = storedData.date;
    tempDiv.innerHTML = `${Math.round(storedData.temperature)} C°`;
    contentDiv.innerHTML = storedData.userFeedback;
  } catch (err) {
    console.log(err);
  }
};

// add sendData function
const sendData = async (path, data) => {
  // mdn boilerplate
  const request = await fetch(path, {
    method: 'POST',
    mod: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try { return await request.json(); } catch (err) { return err; }
};

// get data from openWeatherMap api
const getWeather = async (zipVal) => {
  const response = await fetch(`${url}zip=${zipVal}&appid=${apiKey}&units=metric`);
  // check if fetched data returned
  if (response.status !== 200) {
    throw new Error('cannot fetch data'); // custom error to detect if there is an error in api itself
  }
  return response.json();
};

// event listener callback function
function performAction() {
  // get values of zip code  & feelings
  const zipVal = zipInput.value;
  const feedback = userFeedback.value;
  getWeather(zipVal) // chaining .then() method here because getWeather returns a promise
    .then((data) => {
      sendData('/send', {
        date: newDate,
        temperature: data.main.temp, // get the temperature from api
        userFeedback: feedback,
      });
    }).then(() => { updateView('/all'); }) // add update view function to add retrieved data to DOM
    .catch((err) => console.log('rejected:', err.message)); // detect is there any error in json format
}

// // add click event on generate button
btn.addEventListener('click', performAction);

// add keyUp event
zipInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') { performAction(); }
});

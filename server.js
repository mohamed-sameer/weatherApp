// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// get route function
app.get('/all', (req, res) => {
  res.send(projectData);
});

// post route function
app.post('/send', (req, res) => {
  const { temperature, date, userFeedback } = req.body;
  projectData.temperature = temperature;
  projectData.date = date;
  projectData.userFeedback = userFeedback;

  res.send(projectData);
});

// Setup Server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on server ${port}...`));

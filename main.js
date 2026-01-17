const express = require('express');
const expressApp = express();
const cors = require('cors');

expressApp.use(express.json());
expressApp.use(cors());

const deviceRoute = require('./routes/device');
expressApp.use('/deviceapi', deviceRoute);
const clientRoute = require('./routes/client');
expressApp.use('/clientapi', clientRoute);

expressApp.get('/', (req, res) => {
    res.send('GusPlant - a device for recording and monitoring your cutie plants.');
})
expressApp.listen(80, () => {
    console.log(`Port: 80`);
})

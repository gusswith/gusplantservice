const express = require('express');
const expressRouter = express.Router();
const firebaseDB = require('../firebase/firebase');

expressRouter.post('/ping', async(req,res) => {
    try {
        const { plantKey,plantDevice } = req.body;
        if(!plantKey || !plantDevice) {
            return res.status(400).json({
                status: 'Error',
                error: "plantKey and plantDevice is required"
            });
        }

        const dbQuery = firebaseDB.ref('/').orderByChild('plantKey').equalTo(plantKey);
        const dbSnapshot = await dbQuery.once('value');
        if (!dbSnapshot.exists()) {
            return res.status(404).json({
                error: 'plantKey not found'
            });
        }
        const dbData = dbSnapshot.val();
        const dbObjectKey = Object.keys(dbData)[0];
        const dbReference = firebaseDB.ref(`/${dbObjectKey}`);
        await dbReference.update({
            plantLastPing: new Date().toISOString(),
            plantDevice: plantDevice
        });

        return res.status(200).json({
            status: "OK"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'Internal Server Error',
            error: error
        });
    }
})

expressRouter.post('/send', async(req,res) => {
    try {
        const { plantKey, recordSoilMoisture, recordHumidity, recordTemperature} = req.body;
        if(!plantKey || !recordSoilMoisture || !recordHumidity || !recordTemperature) {
            return res.status(400).json({
                status: 'Error',
                error: "field is required"
            });
        }

        const dbQuery = firebaseDB.ref('/').orderByChild('plantKey').equalTo(plantKey);
        const dbSnapshot = await dbQuery.once('value');
        if (!dbSnapshot.exists()) {
            return res.status(404).json({
                error: 'plantKey not found'
            });
        }
        const dbData = dbSnapshot.val();
        const dbObjectKey = Object.keys(dbData)[0];
        const dbReference = firebaseDB.ref(`/${dbObjectKey}/records`);
        await dbReference.push({
            recordSoilMoisture: recordSoilMoisture,
            recordHumidity: recordHumidity,
            recordTemperature: recordTemperature,
            recordTimeStamp: new Date().toISOString()
        });

        return res.status(200).json({
            status: "OK"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'Internal Server Error',
            error: error
        });
    }
})

module.exports = expressRouter;
const express = require('express');
const expressRouter = express.Router();
const firebaseDB = require('../firebase/firebase');

expressRouter.post('/list', async(req,res) => {
    try {
        const dbQuery = firebaseDB.ref('/');
        const dbSnapshot = await dbQuery.get();
        if (!dbSnapshot.exists()) {
            return res.status(404).json({
                error: 'List not found'
            });
        }
        const data = dbSnapshot.val();
        const filtered = Object.fromEntries(
            Object.entries(data).map(([id, value]) => {
                const { plantKey, ...rest } = value;
                return [id, rest];
            })
        );
        res.json(filtered);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'Internal Server Error',
            error: error
        });
    }
})

module.exports = expressRouter;
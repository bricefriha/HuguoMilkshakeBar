import reservation from '../models/Reservation.js';

import express from 'express';

const router = express.Router();

router
    .post('/create', async (req, res) => {

        // Fetch all the informations
        const { tableNum, timeStart, timeEnd } = req.body;
        await reservation.createRes(tableNum, req.user.sub, timeStart, timeEnd)
            .then(data => res.status(200).json({  data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    .put('/cancel/:reservationId', async (req, res) => {

        // Fetch all the informations
        const { tableNum, timeStart, timeEnd } = req.body;
        await reservation.cancel( req.user.sub, req.params.reservationId )
            .then(data => res.status(200).json({  data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    ;

export default router;
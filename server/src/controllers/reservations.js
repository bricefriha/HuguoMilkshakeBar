import reservation from '../models/Reservation.js';

import express from 'express';

const router = express.Router();

router
    .post('/create', async (req, res) => {

        // Fetch all the informations
        const { email, firstname, lastname, username, password, isStaff } = req.body;
        await reservation.createRes(email, firstname, lastname, username, password, isStaff)
            .then(res.status(200).json({ message: 'Reservation created' }))
            .catch(err => res.status(500).json({ message: err }));
    })
    ;

export default router;
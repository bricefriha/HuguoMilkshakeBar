import user from '../models/User.js';

import express from 'express';

const router = express.Router();

router
    .post('/create', async (req, res) => {

        // Fetch all the informations
        const { email, firstname, lastname, username, password, isStaff } = req.body;
        user.createUser(email, firstname, lastname, username, password, isStaff)
            .then(res.status(200).json({ message: 'User created' }))
            .catch(err => res.status(500).json({ message: err }));
    })
    .post('/authenticate', async (req, res) => {

        // Fetch all the informations
        const { email, username, password } = req.body;
        await user.authenticate(email, username, password)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    });

export default router;

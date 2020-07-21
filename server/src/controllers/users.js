import user from '../models/User.js';

import express from 'express';

const router = express.Router();

router
    .post('/create', async (req, res) => {

        // Fetch all the informations
        const { email, firstname, lastname, username, password, isStaff } = req.body;
        user.createUser(email, firstname, lastname, username, password, isStaff)
            .then(res.status(200).json({ message: 'User created' }))
            .catch(res.status(500).json({ message: 'error' }));
    });

export default router;

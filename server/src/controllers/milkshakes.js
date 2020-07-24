import milkshake from '../models/Milkshake.js';

import express from 'express';

const router = express.Router();

router
    .post('/create', async (req, res) => {

        // Fetch information from the body
        const { name, image, description, price } = req.body;

        // Create a milshake
        await milkshake.create(req.user.sub, name, image, description, price)
                       .then(data => res.status(200).json({ data }))
                       .catch(err => res.status(500).json({ message: err }));

    })
    ;
export default router;
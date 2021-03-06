import milkshake from '../models/Milkshake.js';

import express from 'express';

const router = express.Router();

router
    .get('/', async (req, res) => {
        // get all milkshakes
        await milkshake.getAll()
                       .then(data => res.status(200).json( data ))
                       .catch(err => res.status(500).json({ message: err }));
    })
    .get('/single', async (req, res) => {
        // Fetch information from the body
        const { milkshakeId } = req.body;

        // get all milkshakes
        await milkshake.getById(milkshakeId)
                       .then(data => res.status(200).json( data ))
                       .catch(err => res.status(500).json({ message: err }));
    })
    .post('/create', async (req, res) => {

        // Fetch information from the body
        const { name, image, description, price } = req.body;

        // Create a milshake
        await milkshake.createMilkshake(req.user.sub, name, image, description, price)
                       .then(data => res.status(200).json({ data }))
                       .catch(err => res.status(500).json({ message: err }));

    })
    .delete('/:milkshakeId', async (req, res) => {
        // Create a milshake
        await milkshake.deleteMilkshake(req.user.sub, req.params.milkshakeId)
                       .then(data => res.status(200).json({ data }))
                       .catch(err => res.status(500).json({ message: err }));

    })
    .put('/:milkshakeId', async (req, res) => {
        // Create a milshake
        await milkshake.updateMilkshake(req.user.sub, req.params.milkshakeId, req.body )
                       .then(data => res.status(200).json( data ))
                       .catch(err => res.status(500).json({ message: err }));

    })
    ;
export default router;
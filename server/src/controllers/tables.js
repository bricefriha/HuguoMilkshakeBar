import table from '../models/Table.js';

import express from 'express';

const router = express.Router();

router
    .get('/', async (req, res) => {
        // Get all the tables
        await table.getAll()
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    .post('/create', async (req, res) => {

        // Fetch all the informations
        const { num } = req.body;

        // Create the table
        await table.createTable(req.user.sub, num)
            .then(data => res.status(200).json({ message: 'Table created', info: data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    // free/unfree a table up
    .put('/:tableNum', async (req, res) => {

        //
        await table.freeTable(req.user.sub, req.params.tableNum)
            .then(data => res.status(200).json({  data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    .delete('/:tableNum', async (req, res) => {
        // call a methode to delete the table
        await table.deleteTable(req.user.sub, req.params.tableNum)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    ;

export default router;
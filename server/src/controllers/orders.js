import order from '../models/Order.js';

import express from 'express';

const router = express.Router();

router
    .get('/', async (req, res) => {
        await order.getAll(req.user.sub)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    .get('/customer', async (req, res) => {
        
        await order.getByCustomer(req.user.sub)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    .post('/create', async (req, res) => {

        // Create the order
        await order.createOrder(req.user.sub)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    .put('/cancel/:orderNum', async (req, res) => {

        // cancel the order
        await order.cancelOrder(req.user.sub, req.params.orderNum)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    .put('/validate/:orderNum', async (req, res) => {

        // cancel the order
        await order.validateOrder(req.user.sub, req.params.orderNum)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    ;

export default router;
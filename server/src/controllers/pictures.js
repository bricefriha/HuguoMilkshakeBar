import pic from '../models/Picture.js';
import {upload} from '../helpers/storage.js';

import express from 'express';
import fs from 'fs';

const router = express.Router();

router
    .get('/', async function(req, res) {
        await pic.getAll()
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    .post('/upload', upload.single('image'), async function(req, res) {
        if(!req.file) {
            res.status(500).json({ message:'error' });
          }
        await pic.savePicture(req.user.sub, req.body.title, req.body.description, 'http://192.168.0.7:3000/images/' + req.file.filename, req.file.filename)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    .delete('/:pictureId', async function(req, res){
        // Delete the file
        await pic.deletePicture(req.user.sub, req.params.pictureId)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    } );

export default router;
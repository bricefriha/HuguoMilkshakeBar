import pic from '../models/Picture.js';
import {upload} from '../helpers/storage.js';

import express from 'express';

const router = express.Router();

router
    .post('/upload', upload.single('image'), async function(req, res) {
         console.log(req.file);
        if(!req.file) {
            res.status(500).json({ message:'error' });
          }

        await pic.savePicture(req.user.sub, req.body.title, req.body.description, 'http://192.168.0.7:3000/images/' + req.file.filename)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    });

export default router;
import post from '../models/Post.js';

import express from 'express';

const router = express.Router();

router
    .post("/create", async (req, res) => {
        await post.createPost(req.user.sub, req.body.headline, req.body.content)
            .then(data => res.status(200).json({ data }))
            .catch(err => res.status(500).json({ message: err }));
    })
    ;
export default router;

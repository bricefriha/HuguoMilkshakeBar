import post from '../models/Post.js';

import express from 'express';

const router = express.Router();

router
    .get("/", async (req, res) => {
        await post.getAll()
            .then(data => res.status(200).json( data ))
            .catch(err => res.status(500).json({ message: err }));
    })
    .post("/create", async (req, res) => {
        await post.createPost(req.user.sub, req.body.headline, req.body.content)
            .then(data => res.status(200).json( data ))
            .catch(err => res.status(500).json({ message: err }));
    })
    .delete("/:postId", async (req, res) => {
        await post.deletePost(req.user.sub, req.params.postId)
            .then(data => res.status(200).json( data ))
            .catch(err => res.status(500).json({ message: err }));
    })
    .put("/:postId", async (req, res) => {
        await post.updatePost(req.user.sub, req.params.postId, req.body )
            .then(data => res.status(200).json( data ))
            .catch(err => res.status(500).json({ message: err }));
    })
    ;
export default router;

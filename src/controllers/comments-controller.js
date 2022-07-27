
import * as commentServices from '../services/comment-services.js';
import express from 'express';
export const commentRouter = express.Router();

commentRouter
    .post('/createComment/:postId/:userId', async (req, res) => {
        const {postId, userId} = req.params;
        const result = await commentServices.createComment(userId, postId, req.body);
        res.status(200).send(result)
    })
    .put('/editComment/:commentId', async (req, res) => {
        const {commentId} = req.params;
        const { content } = req.body;
        const result = await commentServices.updateComment(commentId, content);
        res.status(200).send(result)
    })
    .get('/comment/:commentId', async (req, res) => {
        const {commentId} = req.params;
        const { content } = req.body;
        const result = await commentServices.getComment(commentId, content);
        res.status(200).send(result)
    })
    .get('/postComments/:postId/:page/:portion/:userId', async (req, res) => {
        const result = await commentServices.getPostComments(req.params);
        res.status(200).send(result)
    })
    .post('/likeComment/:commentId',async (req, res) => {
        const {commentId} = req.params;
        const { userId } = req.body;
        const result = await commentServices.likeComments(userId, commentId);
        res.status(200).send(result)
    })
    .get('/commentLikes/:commentId',async (req, res) => {
        const {commentId} = req.params;
        const result = await commentServices.getLikesCount(commentId);
        res.status(200).send(result)
    })
    .delete('/comment/:commentId', async (req, res) => {
        const {commentId} = req.params;
        const result = await commentServices.deleteComment(commentId);
        res.status(200).send(result)
    })
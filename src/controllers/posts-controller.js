import * as postServices from '../services/posts-services.js';
import express from 'express';
export const postRouter = express.Router();

postRouter
    .post('/createPost/:id', async (req, res) => {
        const data = req.body;
        const userId = req.params.id;
        const result = await postServices.createPost(userId, data);
        res.status(200).send(result)
    })
    .post('/sharePost/:userId', async (req, res) => {
        const data = req.body;
        const userId = req.params.userId;
        const result = await postServices.sharePost(userId,data);
        res.status(200).send(result)
    })
    .put('/updatePost/:postId', async (req, res) => {
        const userId = req.params.id;
        const editPostData = req.body
        const originalPostData = await postServices.getPost(editPostData.idposts);
        const postData = {
            ...originalPostData,
            ...editPostData
        }
        console.log(postData)
        const result = await postServices.updatePost(postData);
        res.status(200).send(result)
    })
    .get('/post/:id', async (req, res) => {
        const postId = req.params.id;
        const result = await postServices.getPost(postId);
        res.status(200).send(result)
    })
    .get('/newsFeed/:userId/:page/', async (req, res) => {
        const { userId, page } = req.params;
        const result = await postServices.getNewsFeed(userId, page);
        res.status(200).send(result)
    })
    .get('/profile/:userId/:page/:viewerId', async (req, res) => {
        const { userId, page, viewerId } = req.params;
        const result = await postServices.getUserProfilePosts(userId, page, viewerId);
        res.status(200).send(result)
    })
    .post('/likePost/:postId', async (req, res) => {
        const postId = req.params.postId;
        const { userId } = req.body;
        const result = await postServices.likePost(userId, postId);
        res.status(200).send(result)
    })
    .get('/postLikes/:postId', async (req, res) => {
        const postId = req.params.postId;
        const result = await postServices.getPostLikes(postId);
        res.status(200).send(result)
    })
    .get('/isPostLiked/:postId', async (req, res) => {
        const postId = req.params.postId;
        const {userId} = req.body;
        const result = await postServices.getIsPostLiked(userId, postId);
        res.status(200).send(result)
    })
    .delete('/post/:postId', async (req, res) => {
        const postId = req.params.postId;
        const result = await postServices.deletePost(postId);
        res.status(200).send(result)
    })
    .get('/notifications/:userId', async(req, res)=> {
        const { userId } = req.params;
        const result = await postServices.getAllNotifications(userId);
        res.status(200).send(result)
    })
import * as userServices from '../services/users-services.js';
import express from 'express';
export const userRouter = express.Router();

userRouter
    .post('/createUser/', async (req, res) => {
        const data = req.body;
        const result = await userServices.createUser(data)
        res.status(200).send(result)
    })
    .put('/updateUser/:id', async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const userData = await userServices.getUser(id);

        const newData = {
            ...userData,
            ...data
        }
        const result = await userServices.updateUser(newData)
        res.status(200).send(result)
    })
    .get('/userProfile/:id', async (req, res) => {
        const { id } = req.params;
        const result = await userServices.getUser(id)
        res.status(200).send(result)
    })
    .get('/privateInfo/:id', async (req, res) => {
        const { id } = req.params;
        const result = await userServices.getPrivateUser(id);
        res.status(200).send(result)
    })
    .get('/postsUsers/', async (req, res) => {
        const { userIdS } = req.body;
        const result = await userServices.getPostUsers(userIdS)
        res.status(200).send(result)
    })
    .post('/follow/:followedId', async (req, res) => {
        const { followedId } = req.params;
        const { followerId } = req.body;
        const result = await userServices.followUser(followerId, followedId)
        res.status(200).send(result)
    })
    .get('/following/:followedId', async (req, res) => {
        const { followedId } = req.params;
        const { followerId } = req.body;
        const result = await userServices.isFollowing(followerId, followedId);
        if(!result.error){
            const response = {
                'following': result
            }
            res.status(200).send(response)
        } else {
            res.status(400).send(result)
        }

    })
    .get('/followers/:id', async (req, res) => {
        const { id } = req.params;
        const result = await userServices.getFollowers(id);
        res.status(200).send(result)
    })
    .post('/login/:id', async (req, res) => {
        const { id } = req.params;
        const result = await userServices.login(id);
        res.status(200).send(result)
    })
    .post('/createProfile/:id', async (req, res) => {
        const data = {
            ...req.body,
            userId: req.params.id
        };
        const result = await userServices.createProfileData(data);
        res.status(200).send(result)
    })
    .post('/userAvatars/', async (req, res) => {
        const { userIds = [] } = req.body;
        const result = await userServices.getAvatars(userIds);
        res.status(200).send(result)
    })
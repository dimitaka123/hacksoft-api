import express from 'express';
import appServices from '../services/app-services.js';
export const appsRouter = express.Router();
appsRouter
.post('/apps/',                                                         //create icon
async (req, res) => {
    const data = req.body;
    if(data.secretKey!=="thisISmyPageMothafocka"){
        res.status(200).send("Incorrect key");
    } else {
        const result = await appServices.createApp(data)
        res.status(200).send(result)
    }

}
)
.get('/apps/id/:id',
    async ( req, res ) => {
        const {id} = req.params;
        const result = await appServices.getApp(id);
        res.status(200).send(result);
    }
)
.get('/apps/all/:page',                                                    //get icons
    async (req, res) => {
        const { page } = req.params;
        const result = await appServices.getApps(page);
        res.status(200).send(result)
    }
)
.get('/apps/all-reverse/:page',                                                    //get icons
    async (req, res) => {
        const { page } = req.params;
        const result = await appServices.getAppsReverse(page);
        res.status(200).send(result)
    }
)
.get('/count/',
    async (req, res) => {
        const result = await appServices.getCount();
        res.status(200).send(result)
    }
)
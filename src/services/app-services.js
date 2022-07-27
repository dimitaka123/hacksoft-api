import appsData from '../data/apps-data.js'

const createApp = async(data) => {
    const {logo, link, name, description} = data;
    const res = await appsData.createApp(logo, link, name, description)
    return res;
}
const getApp = async(id) => {
    const res = await appsData.getApp(id);
    return res;
}

const getApps = async (page) => {
    const res = await appsData.getApps((page-1)*12)
    return res;
}
const getAppsReverse = async (page) => {
    const res = await appsData.getAppsReverse((page-1)*12);
    return res
}

const getCount = async () => {
    const res = await appsData.getCount();
    return res;
}
export default{
    createApp,
    getApp,
    getApps,
    getAppsReverse,
    getCount
}
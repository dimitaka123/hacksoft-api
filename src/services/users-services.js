import * as userData from '../data/user-data.js';

const createUser = async(user)=> {
    const {
        username, 
        firstname, 
        lastname, 
        email
    } = user;
    const result = await userData.createUser(username, firstname, lastname, email);
    if(!result){
        return {
            error: 'Could not create user!'
        }
    } else {
        return result;
    }
}

const updateUser = async(userId, user) => {
    const {
        username, 
        firstname, 
        lastname, 
        email
    } = user;
    const result = await userData.updateUser(userId,{username, firstname, lastname, email});
    if(!result){
        return {
            error: 'Could not update user!'
        }
    } else {
        return result;
    }
}

const getUser = async(userId) =>{
    const result = await userData.getUser(userId);
    if(!result){
        return {
            error: 'Could not get user!'
        }
    } else {
        return result[0];
    }
}

const getPostUsers = async(userIds) =>{
    const result = await userData.getPostUsers(userIds);

    if(!result){
        return {
            error: 'Could not get users!'
        }
    } else {
        return result;
    }
}

const getPrivateUser = async(userId) =>{
    const result = await userData.getPrivateUser(userId);
    if(!result){
        return {
            error: 'Could not get user!'
        }
    } else {
        return result[0];
    }
}

const followUser = async(followerId, followedId)=> {
    let result;
    const following = await userData.getFollowById(followerId, followedId)
    const { idfollowing } = following;
    if(idfollowing){
        result = await userData.unfollowUser(idfollowing); 
    } else {
        result = await userData.followUser(followerId, followedId);
    };
    if(!result){
        return {
            error: 'Could not do follow action!'
        }
    } else {
        return result;
    }
}

const isFollowing = async(followerId, followedId)=> {
    const result = await userData.getFollowById(followerId, followedId)
    const { idfollowing } = result;
    return !!idfollowing;
}

const getFollowers = async(followedId)=> {
    let result = await userData.getFollowersByPerson(followedId);
    if(!result){
        return {
            error: 'Could not get followers!'
        }
    } else {
        return result;
    }
}

const createProfileData = async(user)=> {
    const {
        userId, 
        position, 
        nationality, 
        gender, 
        avatar
    } = user;
    const result = await userData.postProfileData(userId, position, nationality, gender, avatar);
    if(!result){
        return {
            error: 'Could not create user!'
        }
    } else {
        return result;
    }
}

const login = async(userId) =>{
    let result
    const logging = await userData.getLogin(userId);
    const { idlogging = undefined } = logging;
    if(!idlogging){
        result = await userData.postLogin(userId);
        const data = await userData.getLogin(userId);
        
        result = {
            newLogin: data,
        }
    } else {
        const stepOne = await userData.deleteLogin(userId);
        result = await userData.postLogin(userId);
        const data = await userData.getLogin(userId);

        result = {
            newLogin: data,
            oldLogin: logging
        }
    }
    if(!result){
        return {
            error: 'Could not login!'
        }
    } else {
        return result;
    }
}

const getAvatars = async(userIds) => {
    const stringedData = userIds.join(',');

    const result = await userData.getAvatars(stringedData);
    if(!result){
        return {
            error: 'Could not get avatars!'
        }
    } else {
        return result;
    }
}

export {
    createUser,
    updateUser,
    getUser,
    getPostUsers,
    getPrivateUser,
    followUser,
    isFollowing,
    getFollowers,
    createProfileData,
    login,
    getAvatars
}
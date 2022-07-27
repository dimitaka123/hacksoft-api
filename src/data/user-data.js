import pool from "./pool.js";
const createUser = async(username, firstname, lastname, email)=> {
    const sql = `
    INSERT into users (username, firstname, lastname, email)
    VALUES (?, ?, ?, ?)
    `
    const result = await pool.query(sql, [username, firstname, lastname, email]);
    return {
        id: result.insertId,
        ...result
    }
}
const updateUser = async(userId, {username, firstname, lastname, email}) => {
    const sql = `
    UPDATE users SET username=${username},
    firstname=${firstname},
    lastname=${lastname},
    email=${email}
    WHERE idusers = ${userId}
    `
    const res = await pool.query(sql, [username, firstname, lastname, email, userId]);
    return res;
}
const getUser = async(userId) =>{
        const sql = `
        SELECT users.username, 
        users.firstname, 
        users.lastname,
        users.idusers, 
        profiles.position, 
        profiles.gender,
        profiles.nationality,
        profiles.avatar
        FROM users LEFT JOIN profiles ON users.idusers = profiles.users_idusers 
        WHERE users.idusers = ${userId}
        `
        const res = await pool.query(sql, [userId]);
        return res;
}

const getPostUsers = async(userIds) =>{
    const sql = `
    SELECT
    users.firstname, 
    users.lastname,
    users.idusers, 
    profiles.position, 
    profiles.avatar
    FROM users INNER JOIN profiles ON users.idusers = profiles.users_idusers 
    WHERE users.idusers IN (${userIds.join(',')})
    `
    const res = await pool.query(sql, [userIds]);
    return res;
}

const getPrivateUser = async(userId) =>{
    const sql = `
    SELECT users.username, 
    users.firstname, 
    users.lastname,
    users.idusers,
    users.email, 
    profiles.position, 
    profiles.gender,
    profiles.nationality,
    profiles.avatar
    FROM users INNER JOIN profiles ON users.idusers = profiles.users_idusers 
    WHERE users.idusers = ${userId}
    `
    const res = await pool.query(sql, [userId]);
    return res;
}

const followUser = async(followerId, followedId)=> {
    const sql = `
    INSERT into following (users_idusers, users_idusers1)
    VALUES (?, ?)
    `
    const result = await pool.query(sql, [followerId, followedId]);
    return {
        id: result.insertId,
        ...result[0]
    }
}

const unfollowUser = async(followingId)=> {
    const sql = `
    DELETE FROM following
    WHERE idfollowing=${followingId}
    `
    const result = await pool.query(sql, [followingId]);
    return {
        id: result.insertId,
        ...result[0]
    }
}

const getFollowById = async(followerId, followedId)=> {
    const sql = `
    SELECT * FROM following WHERE users_idusers=${followerId} AND users_idusers1=${followedId}
    `
    const result = await pool.query(sql, [followerId, followedId]);
    return {
        ...result[0]
    }
}

const getFollowersByPerson = async(followedId)=> {
    const sql = `
    SELECT COUNT(*) AS count FROM following WHERE users_idusers1 = ${followedId}
    `
    const result = await pool.query(sql, [followedId]);
    return {
        ...result[0]
    }
}

const postProfileData = async(userId, position, nationality, gender, avatar)=> {
    const sql = `
    INSERT into profiles (users_idusers, position, nationality, gender, avatar)
    VALUES (?, ?, ?, ?, ?)
    `
    const result = await pool.query(sql, [userId, position, nationality, gender, avatar]);
    return {
        id: result.insertId,
        ...result
    }
}

const postLogin = async(userId)=> {
    const sql = `
    INSERT into logging (users_idusers)
    VALUES (?)
    `
    const result = await pool.query(sql, [userId]);
    return {
        id: result.insertId,
        ...result
    }
}

const getLogin = async(userId)=> {
    const sql = `
    SELECT * FROM logging WHERE users_idusers=${userId}
    `
    const result = await pool.query(sql, [userId]);
    return {
        ...result[0]
    }
}

const deleteLogin = async(userId)=> {
    const sql = `
    DELETE FROM logging WHERE users_idusers=${userId}
    `
    const result = await pool.query(sql, [userId]);
    return {
        id: result.insertId,
        ...result
    }
}

const getAvatars = async(userIds) => {
    const sql = `
    SELECT U.username, U.idusers, U.firstname, U.lastname, P.avatar FROM users U 
    LEFT JOIN profiles P ON P.users_idusers = U.idusers
    WHERE idusers IN(${userIds})
    `

    const result = await pool.query(sql, [userIds]);
    return result;
}

export {
    createUser,
    updateUser, 
    getUser,
    getPostUsers,
    getPrivateUser,
    followUser,
    unfollowUser,
    getFollowById,
    getFollowersByPerson,
    postProfileData,
    postLogin,
    getLogin,
    deleteLogin,
    getAvatars
}
import pool from "./pool.js";
const createPost = async(userId, content, pictureLink=null)=> {
    const sql = `
    INSERT into posts (users_idusers, content, isShared, pictureLink)
    VALUES (?, ?, ?, ?)
    `
    const result = await pool.query(sql, [userId, content, 0,pictureLink]);
    return {
        id: result.insertId,
        ...result[0]
    }
}

const sharePost = async(userId, content, pictureLink, originalPostId)=> {
    const sql = `
    INSERT into posts (users_idusers, content, pictureLink, isShared, originalPostId)
    VALUES (?, ?, ?, ?, ?)
    `
    const result = await pool.query(sql, [userId, content, pictureLink, 1, originalPostId]);
    return {
        id: result.insertId,
        ...result
    }
}

const updatePost = async(data)=> {
    const { 
        content, 
        pictureLink, 
        isShared,  
        originalPostId, 
        idposts
    } = data;

    const sql = `
    UPDATE posts SET 
    content = "${content}",
    pictureLink = ${pictureLink}, 
    isShared = ${isShared}, 
    originalPostId = ${originalPostId}
    WHERE idposts = ${idposts}
    `
    const result = await pool.query(sql, [content, pictureLink, isShared, originalPostId, idposts]);
    return result;
}

const getPost = async(postId) =>{
        const sql = `
        SELECT * FROM posts WHERE idposts=${postId}
        `
        const res = await pool.query(sql, [postId]);
        return res[0];
}

const getNewsFeed = async(userId, offset) =>{
    const sql = `
    SELECT P.idposts, P.content, P.time, P.isShared, P.originalPostId, P.pictureLink, P.users_idusers, L.idlikedPosts, 
    P1.content AS orgContent, P1.users_idusers AS orgUserId, P1.pictureLink AS orgPictureLink FROM posts P 
    INNER JOIN following F 
    ON P.users_idusers= F.users_idusers 

    LEFT JOIN likedposts L 
    ON P.idposts = L.posts_idposts AND L.users_idusers = ${userId}

    LEFT JOIN posts P1
    ON P.originalPostId = P1.idposts

    WHERE F.users_idusers1 IN (SELECT users_idusers1 FROM following WHERE users_idusers=${userId}) AND P.users_idusers!= ${userId}

    UNION 

    SELECT P.idposts, P.content, P.time, P.isShared, P.originalPostId, P.pictureLink, P.users_idusers, L.idlikedPosts,
    P1.content AS orgContent, P1.users_idusers AS orgUserId, P1.pictureLink AS orgPictureLink FROM posts P 
    INNER JOIN following F
    ON P.users_idusers= F.users_idusers1 

    LEFT JOIN likedposts L 
    ON P.idposts = L.posts_idposts AND L.users_idusers = ${userId}

    LEFT JOIN posts P1
    ON P.originalPostId = P1.idposts

    WHERE F.users_idusers1 IN (SELECT users_idusers1 FROM following WHERE users_idusers=${userId}) AND P.users_idusers!= ${userId}

    LIMIT 4
    OFFSET ${offset}
    `
    const res = await pool.query(sql, [userId, offset]);
    return res;
}

const getUserProfilePosts = async(userId, offset, viewerId) => {
    const sql = `
    SELECT P.idposts, P.content, P.time, P.isShared, P.users_idusers AS userProfile, P.pictureLink, L.idlikedPosts FROM posts P
    LEFT JOIN likedposts L
    ON P.idposts = L.posts_idposts AND L.users_idusers = ${viewerId}
    WHERE P.users_idusers=${userId}
    LIMIT 4
    OFFSET ${offset}
    `
    const res = await pool.query(sql, [viewerId, userId, offset]);
    return res;
}

const likePost = async(userId, postId)=> {
    const sql = `
    INSERT into likedposts (users_idusers, posts_idposts)
    VALUES (?, ?)
    `
    const result = await pool.query(sql, [userId, postId]);
    return {
        id: result.insertId,
        ...result[0]
    }
}

const unlikePost = async(userId, postId)=> {
    const sql = `
    DELETE from likedposts WHERE 
    users_idusers=${userId} 
    AND posts_idposts=${postId}
    `
    const result = await pool.query(sql, [userId, postId]);
    return result;
}

const getLikesCount = async(postId)=> {
    const sql = `
    SELECT COUNT(*) AS count FROM likedposts WHERE posts_idposts =${postId}
    `
    const result = await pool.query(sql, [postId]);
    return {
        ...result[0]
    }
}

const getIsPostLiked = async(userId, postId)=> {
    const sql = `
    SELECT * AS count FROM likedposts WHERE posts_idposts =${postId} AND users_idusers = ${userId}
    `
    const result = await pool.query(sql, [userId, postId]);
    return {
        ...result[0]
    }
}

const deletePost = async(postId)=> {
    const sql = `
    DELETE from posts WHERE 
    idposts=${postId}
    `
    const result = await pool.query(sql, [postId]);
    return result;
}

const getPostLikeNotifications = async(userId) => {
    const sql = `
    SELECT P.content AS post, P.idposts, L.users_idusers AS likeUser, L.timeOfLike AS time, L.idlikedPosts, P1.avatar, U.firstname, U.lastname FROM likedposts L
    INNER JOIN posts P ON P.idposts = L.posts_idposts
    INNER JOIN profiles P1 ON L.users_idusers = P1.users_idusers
    INNER JOIN users U ON L.users_idusers = U.idusers
    WHERE P.users_idusers = ${userId} AND L.users_idusers !=${userId}
    `

    const result = await pool.query(sql, [userId]);
    return result;
}

const getPostShareNotifications = async(userId) =>{
    const sql = `
    SELECT P.content, P.users_idusers, P.time, P.idposts, U.firstname, U.lastname FROM posts P 
    INNER JOIN users U ON P.users_idusers = U.idusers
    INNER JOIN posts P1 ON P1.idposts = P.originalPostId
    WHERE P1.users_idusers = ${userId}
    `

    const result = await pool.query(sql, [userId]);
    return result;
}

const getCommentNotifications = async(userId) => {
    const sql = `
    SELECT P.content AS post, P.idposts, C.users_idusers AS commentUser, C.timeOfComment AS time, C.content AS comment , P1.avatar, U.firstname, U.lastname FROM comments C
    INNER JOIN posts P ON P.idposts = C.posts_idposts
    INNER JOIN profiles P1 ON C.users_idusers = P1.users_idusers
    INNER JOIN users U ON C.users_idusers = U.idusers
    WHERE P.users_idusers = ${userId} AND C.users_idusers !=${userId}
    `

    const result = await pool.query(sql, [userId]);
    return result;
}

const getCommentLikeNotifications = async(userId) => {
    const sql = `
    SELECT C.content AS comment, L.users_idusers, L.timeOfLike  AS time, U.firstname, U.lastname, P.avatar FROM comments C 
    INNER JOIN likedcomments L ON C.idcomments = L.comments_idcomments
    INNER JOIN users U ON L.users_idusers = U.idusers
    INNER JOIN profiles P ON P.users_idusers = L.users_idusers
    WHERE C.users_idusers = ${userId} AND L.users_idusers !=${userId};
    `

    const result = await pool.query(sql, [userId]);
    return result;
}
export {
    createPost,
    sharePost, 
    updatePost,
    getPost,
    getNewsFeed,
    getUserProfilePosts,
    likePost,
    unlikePost,
    getLikesCount,
    getIsPostLiked,
    deletePost,
    getPostLikeNotifications,
    getPostShareNotifications,
    getCommentNotifications,
    getCommentLikeNotifications
}
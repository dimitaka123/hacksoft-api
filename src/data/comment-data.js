import pool from "./pool.js";
const createComment = async(userId, content, postId)=> {
    const sql = `
    INSERT into comments (users_idusers, content, posts_idposts)
    VALUES (?, ?, ?)
    `
    const result = await pool.query(sql, [userId, content, postId]);
    return {
        id: result.insertId,
        ...result
    }
}

const updateComment = async(data)=> {
    const { 
        content, 
        idcomments
    } = data;

    const sql = `
    UPDATE comments SET 
    content = "${content}"
    WHERE idcomments = ${idcomments}
    `
    const result = await pool.query(sql, [content, idcomments]);
    return result;
}

const getComment = async(commentId) =>{
        const sql = `
        SELECT * FROM comments WHERE idcomments=${commentId}
        `
        const res = await pool.query(sql, [commentId]);
        return res[0];
}

const deleteComment = async(commentId) =>{
    const sql = `
    DELETE FROM comments WHERE idcomments=${commentId}
    `
    const res = await pool.query(sql, [commentId]);
    return res;
}

const getPostComments = async(postId, userId, page, portion) => {
    const sql = `
    SELECT C.*, L.idLikedComments FROM comments C
    LEFT JOIN likedcomments L ON C.idcomments = L.comments_idcomments AND L.users_idusers = ${userId}
    WHERE posts_idposts=${postId}
    LIMIT ${portion}
    OFFSET ${page*portion}
    `
    const res = await pool.query(sql, [postId, userId, page, portion]);
    return res;
}

const likeComments = async(userId, commentId)=> {
    const sql = `
    INSERT into likedcomments (users_idusers, comments_idcomments)
    VALUES (?, ?)
    `
    const result = await pool.query(sql, [userId, commentId]);
    return {
        id: result.insertId,
        ...result[0]
    }
}

const unlikeComment = async(userId, commentId)=> {
    const sql = `
    DELETE from likedcomments WHERE 
    users_idusers=${userId} 
    AND comments_idcomments=${commentId}
    `
    const result = await pool.query(sql, [userId, commentId]);
    return result;
}

const getIsLiked = async(userId, commentId)=> {
    const sql = `
    SELECT * from likedcomments WHERE 
    users_idusers=${userId} 
    AND comments_idcomments=${commentId}
    `

    const result = await pool.query(sql, [userId, commentId]);
    return result[0];
}

const getLikesCount = async(commentId)=> {
    const sql = `
    SELECT COUNT(*) AS count FROM likedComments WHERE comments_idcomments =${commentId}
    `
    const result = await pool.query(sql, [commentId]);
    return {
        ...result[0]
    }
}

export {
    createComment,
    updateComment, 
    getComment,
    getPostComments,
    likeComments,
    unlikeComment,
    getIsLiked,
    getLikesCount,
    deleteComment
}
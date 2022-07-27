import * as commentData from '../data/comment-data.js';

const createComment = async(userId,postId, {content})=> {

    const result = await commentData.createComment(userId,content, postId);
    if(!result){
        return {
            error: 'Could not create comment!'
        }
    } else {
        return result;
    }
}

const updateComment = async(idcomments, content)=> {
    const result = await commentData.updateComment({idcomments, content});
    if(!result){
        return {
            error: 'Could not edit comment!'
        }
    } else {
        return result;
    }
}

const getComment = async(commentId)=> {
    const result = await commentData.getComment(commentId);
    if(!result){
        return {
            error: 'Could not get comment!'
        }
    } else {
        return result;
    }
}

const getPostComments = async({postId, userId, page, portion})=> {

    let result = await commentData.getPostComments(postId, userId, page, portion);
    if(!result){
        return {
            error: 'Could not get post comments!'
        }
    } else {
        return result;
    }
}


const likeComments = async(userId, commentId)=> {
    let isCommentLiked = await getIsLiked(userId, commentId);
    const { isLiked } = isCommentLiked;
    if(!isLiked){
        let result = await commentData.likeComments(userId, commentId);
        if(!result){
            return {
                error: 'Could not like comment!'
            }
        } else {
            return result;
        }
    } else {
        return await unlikeComment(userId, commentId);
    }

}

const unlikeComment = async(userId, commentId)=> {
    let result = await commentData.unlikeComment(userId, commentId);
    if(!result){
        return {
            error: 'Could not unlike comment!'
        }
    } else {
        return result;
    }
}

const getIsLiked = async(userId, commentId)=> {
    const result = await commentData.getIsLiked(userId, commentId);
    return {
        isLiked: !!result
    }
}

const getLikesCount = async(commentId)=> {
    const result = await commentData.getLikesCount(commentId);
    if(!result){
        return {
            error: 'Could not get likes count!'
        }
    } else {
        return result;
    }
}

const deleteComment = async(commentId)=> {
    const result = await commentData.deleteComment(commentId);
    if(!result){
        return {
            error: 'Could not delete comment!'
        }
    } else {
        return {
            successful: result.affectedRows
        };
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
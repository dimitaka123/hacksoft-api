import * as postData from '../data/post-data.js';

const createPost = async(userId,post)=> {
    const {
        content, 
        pictureLink
    } = post;
    const result = await postData.createPost(userId, content, pictureLink);
    if(!result){
        return {
            error: 'Could not create post!'
        }
    } else {
        return result;
    }
}

const sharePost = async(userId,post)=> {
    const {
        content, 
        pictureLink=null,
        originalPostId
    } = post;
    const result = await postData.sharePost(userId, content, pictureLink, originalPostId);
    if(!result){
        return {
            error: 'Could not share post!'
        }
    } else {
        return result;
    }
}

const updatePost = async(post)=> {
    const result = await postData.updatePost(post);
    if(!result){
        return {
            error: 'Could not update post!'
        }
    } else {
        return result;
    }
}

const getPost = async(postId)=> {

    let result = await postData.getPost(postId);
    if(!result){
        return {
            error: 'Could not get post!'
        }
    } else {
        let originalPost;
        const {isShared, originalPostId} = result;
        if(isShared === 1){

            originalPost = await postData.getPost(originalPostId);
            result = {
                ...result,
                originalPost
            }
        }

        return result;
    }
}


const getNewsFeed = async(userId, page)=> {

    let result = await postData.getNewsFeed(userId,page*4);
    if(!result){
        return {
            error: 'Could not get post!'
        }
    } else {
        result.map(async(post)=> {
            let originalPost;
            const {isShared, originalPostId} = post;
            if(isShared === 1){
                originalPost = await postData.getPost(originalPostId);
                post = {
                    ...post,
                    originalPost
                }
            }
        })
        return await result;
    }
}

const getUserProfilePosts = async(userId, page, viewerId)=> {
    let result = await postData.getUserProfilePosts(userId, page*4, viewerId);
    if(!result){
        return {
            error: 'Could not get posts!'
        }
    } else {
        return result;
    }
}

const likePost = async(userId, postId)=> {
    const result = await postData.likePost(userId, postId);
    if(!result){
        return {
            error: 'Could not like post!'
        }
    } else {
        return result;
    }
}

const unlikePost = async(userId, postId)=> {
    const result = await postData.unlikePost(userId, postId);
    if(!result){
        return {
            error: 'Could not unlike post!'
        }
    } else {
        return result;
    }
}

const getPostLikes = async(postId)=> {
    const result = await postData.getLikesCount(postId);
    if(!result){
        return {
            error: 'Could not get likes!'
        }
    } else {
        return result;
    }
}

const getIsPostLiked = async(userId, postId)=> {
    const result = await postData.getIsPostLiked(userId, postId);

    if(!result){
        return {
            error: 'Could not get likes!'
        }
    } else {
        return {
            liked: !!result.idlikedPosts
        };
    }
}

const deletePost = async(postId)=> {
    const post = await getPost(postId);
    if(post.error){
        return {
            error: 'Post has already been deleted, please refresh the page!'
        }
    }
    const result = await postData.deletePost(postId);
    if(!result){
        return {
            error: 'Could not delete post!'
        }
    } else {
        return {
            success: result.affectedRows
        }
    }
}

const getPostLikeNotifications  = async(userId) => {
    const notifications = await postData.getPostLikeNotifications(userId);
    if(!notifications){
        return {
            error: 'Could not get notifications!'
        }
    } else {
        return notifications
    }
}

const getCommentNotifications = async(userId) => {
    const notifications = await postData.getCommentNotifications(userId);
    if(!notifications){
        return {
            error: 'Could not get notifications!'
        }
    } else {
        return notifications
    }
}

const getPostShareNotifications = async(userId) => {
    const notifications = await postData.getPostShareNotifications(userId);
    if(!notifications){
        return {
            error: 'Could not get notifications!'
        }
    } else {
        return notifications
    }
}

const getAllNotifications = async(userId) => {
    const postLikeNotifications = await getPostLikeNotifications(userId);
    const commentNotifications = await getCommentNotifications(userId);
    const postShareNotifications = await getPostShareNotifications(userId);
    const commentLikeNotifications = await postData.getCommentLikeNotifications(userId);
    const postLikes = postLikeNotifications.map(a => {
        return {
            TYPE: 'post-like',
            data: a
        }
    });
    const comments = commentNotifications.map(a => {
        return {
            TYPE: 'new-comment',
            data: a
        }
    });
    const shares = postShareNotifications.map(a => {
        return {
            TYPE: 'post-share',
            data: a
        }
    });
    const commentLikes = commentLikeNotifications.map(a => {
        return {
            TYPE: 'comment-like',
            data: a
        }
    });
    const result= [...postLikes, ...comments, ...shares, ...commentLikes]
    const sortedResult = result.sort((a, b) => {
        let date1 = new Date (a.data.time);
        let date2 = new Date (b.data.time);
        console.log(date1 > date2);
        if(date1 > date2) {
            return 1;
        } else if(date2 > date1) {
            return -1;
        } else {
            return 0;
        }
    });

    return sortedResult;
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
    getPostLikes,
    getIsPostLiked,
    deletePost,
    getPostLikeNotifications,
    getCommentNotifications,
    getAllNotifications
}
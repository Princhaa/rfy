export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_POST_ID = 'SET_POST_ID';

export function setLoginState(loginState){
    return {
        type: SET_LOGIN_STATE,
        loginState
    }
}

export function setToken(token){
    return {
        type: SET_TOKEN,
        token
    }
}

export function setUserId(userId){
    return  {
        type: SET_USER_ID,
        userId
    }
}

export function setPostId(postId){
    return {
        type: SET_POST_ID,
        postId
    }
}
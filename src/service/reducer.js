import { combineReducers } from 'redux';
import { 
    SET_LOGIN_STATE, 
    setLoginState, 
    SET_TOKEN, 
    setToken, 
    SET_USER_ID, 
    setUserId, 
    SET_POST_ID, 
    setPostId, 
    SET_USER_PRIVILEGE, 
    setUserPrivilege 
} from './action';

function loginState(state = '', action){
    switch(action.type){
        case SET_LOGIN_STATE : {
            return action.loginState
        }
        default : {
            return state
        }
    }
}

function token(state = '', action){
    switch(action.type){
        case SET_TOKEN : {
            return action.token
        }
        default: {
            return state
        }
    }
}

function userId(state = '', action){
    switch(action.type){
        case SET_USER_ID : {
            return action.userId
        }
        default : {
            return state;
        }
    }
}

function postId(state = '', action){
    switch(action.type){
        case SET_POST_ID : {
            return action.postId
        }
        default: {
            return state;
        }
    }
}

function userPrivilege(state = '', action){
    switch(action.type) {
        case SET_USER_PRIVILEGE : {
            return action.userPrivilege
        }
        default : {
            return state;

        }
    }
}

const rfyApp = combineReducers({
    loginState,
    token,
    userId,
    postId,
    userPrivilege
});

export default rfyApp;
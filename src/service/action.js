export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_TOKEN = 'SET_TOKEN';

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
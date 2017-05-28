export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';

export function setLoginState(loginState){
    return {
        type: SET_LOGIN_STATE,
        loginState
    }
}
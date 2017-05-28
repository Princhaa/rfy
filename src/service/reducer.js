import { combineReducers } from 'redux';
import { SET_LOGIN_STATE, setLoginState } from './action';

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

const rfyApp = combineReducers({
    loginState
});

export default rfyApp;
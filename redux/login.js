const initialState = {
    isLoggedIn: false,
    data: {
        USERNAME: '',
        EMAIL: '',
        IMAGE: '',
        FIRSTNAME: '',
        LASTNAME: '',
    }
}

import * as actionType from './ActionTypes'

export const login = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {

        case actionType.LOGIN_STATE:

            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
            }
        case actionType.LOGOUT_STATE:
            return {
                ...state,
                ...action.payload,
                isLoggedIn: false,

            }
        default:
            return state;
    }
}
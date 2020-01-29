import axios from 'axios'
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'

import {returnErrors} from './errorActions'

//Check token and load user
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({
        type: USER_LOADING
    })


    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

//Setup config/headers and token
export const tokenConfig = getState => {
        //Get token from local storage
        const token = getState().auth.token

        //Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
    
        //Check token
        if(token) {
            config.headers['x-auth-token'] = token
        }

        return config
}

//Register User
export const register = (newUser) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify(newUser)
    axios.post('api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

//Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//Login User
export const login = (user) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify(user)
    axios.post('api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}
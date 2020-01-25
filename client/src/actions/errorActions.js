import {GET_ERRORS, CLEAR_ERRORS} from './types'

//Return erros
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {
            msg,
            status,
            id
        }
    }
}

//Clear errors
export const clearErros = () => {
    return {
        type: CLEAR_ERRORS
    }
}
import {FETCH_ITEMS, NEW_ITEM, DELETE_ITEM} from './types'
import axios from 'axios'
import {tokenConfig} from './authActions'
import {returnErrors} from './errorActions'

export const fetchItems = () => dispatch => {
    console.log('fetching items')
    axios.get('api/items')
        .then(res => dispatch({
            type: FETCH_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const newItem = item => (dispatch, getState) => {
    console.log('adding item ' +item.name)
    axios.post('api/items', item, tokenConfig(getState))
        .then(res => dispatch({
            type: NEW_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = id => (dispatch, getState) => {
    console.log('deleting item ')
    axios.delete(`api/items/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
    return {
        type: DELETE_ITEM,
        payload: id
    }
}
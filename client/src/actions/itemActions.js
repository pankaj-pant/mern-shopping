import {FETCH_ITEMS, NEW_ITEM, DELETE_ITEM} from './types'
import axios from 'axios'

export const fetchItems = () => dispatch => {
    console.log('fetching items')
    axios.get('api/items')
        .then(res => dispatch({
            type: FETCH_ITEMS,
            payload: res.data
        }))
}

export const newItem = item => dispatch => {
    console.log('adding item ' +item.name)
    axios.post('api/items', item)
        .then(res => dispatch({
            type: NEW_ITEM,
            payload: res.data
        }))
}

export const deleteItem = id => dispatch => {
    console.log('deleting item ')
    axios.delete(`api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
    return {
        type: DELETE_ITEM,
        payload: id
    }
}
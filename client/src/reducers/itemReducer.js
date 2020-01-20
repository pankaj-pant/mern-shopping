import {FETCH_ITEMS, NEW_ITEM, DELETE_ITEM} from '../actions/types'
import uuid from 'uuid'

const initialState = {
    items: [
        {id: uuid(), name: 'Milk'},
        {id: uuid(), name: 'Cheese'},
        {id: uuid(), name: 'Eggs'},
        {id: uuid(), name: 'Bread'}
    ]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ITEMS:
            console.log('inside fetch items reducer')
            return {...state}
        case NEW_ITEM:
            console.log('inside create new item reducer')
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case DELETE_ITEM:
            console.log('inside delete item reducer')
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.payload)
            }
        default:
            return state
    }
}
import {FETCH_ITEMS, NEW_ITEM} from '../actions/types'
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
        default:
            return state
    }
}
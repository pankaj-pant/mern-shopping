import {FETCH_ITEMS, NEW_ITEM, DELETE_ITEM} from '../actions/types'

const initialState = {
    items: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ITEMS:
            console.log('inside fetch items reducer')
            return {
                ...state,
                items: action.payload
            }
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
                items: state.items.filter(i => i._id !== action.payload)
            }
        default:
            return state
    }
}
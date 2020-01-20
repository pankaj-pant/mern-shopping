import {FETCH_ITEMS, NEW_ITEM, DELETE_ITEM} from './types'

export const fetchItems = () => {
    console.log('fetching items')
    return {
        type: FETCH_ITEMS
    }
}

export const newItem = item => {
    console.log('adding item ' +item.name)
    return {
        type: NEW_ITEM,
        payload: item
    }
}

export const deleteItem = item => {
    console.log('deleting item ')
    return {
        type: DELETE_ITEM,
        payload: item
    }
}
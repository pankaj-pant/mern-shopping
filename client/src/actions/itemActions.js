import {FETCH_ITEMS, NEW_ITEM} from './types'

export const fetchItems = () => {
    console.log('fetching items')
    return {
        type: FETCH_ITEMS
    }
}
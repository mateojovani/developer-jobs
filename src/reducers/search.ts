import { Action } from '../types'

const initialState = {}

export default (state = initialState, action: Action) => {
    switch (action.type) {
        default:
            return state
    }
}
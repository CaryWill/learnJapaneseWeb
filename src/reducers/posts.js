import * as ActionTypes from "./../actions/types"

export const posts = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_POSTS:
            const { type, posts } = action.payload;
            return {...state, [type]: posts}
        default:
            return state;
    }
}
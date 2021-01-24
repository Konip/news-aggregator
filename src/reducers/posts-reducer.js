import posts from '../posts.json';

const initialState = {
    posts: [],
}

const postReducers = (state = initialState, action) => {

    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
                posts: action.payload,
            }
        case "REMOVE_POSTS":
            return {
                ...state
            }

        default:
            return state;
    }
}

export default postReducers

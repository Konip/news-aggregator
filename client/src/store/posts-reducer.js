import { getPost } from './../api/postApi';


const SET_POST = "SET_POST ";
const LOADING = "LOADING"


let initialState = {
    posts: [],
    loading: false
}

const postReducers = (state = initialState, { type, payload }) => {

    switch (type) {
        case SET_POST: {
            return {
                ...state,
                posts: [...state.posts, ...payload]
            }
        }

        case LOADING: {
            return { ...state, loading: payload }
        }

        default:
            return state;
    }
}

export default postReducers

export const setPost = (posts) => ({ type: SET_POST, payload: posts })
export const setLoading = (payload) => ({ type: LOADING, payload })

export const getPostThunk = (str) => {

    return (dispatch) => {
        dispatch(setLoading(true))

        getPost(str).then(res => {
            console.log(res)
            dispatch(setPost(res))
            dispatch(setLoading(false))
        })
    }
}

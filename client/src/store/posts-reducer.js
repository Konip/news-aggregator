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
            if (state.posts.length > 12) {
                return {
                    ...state,
                    posts: [...payload, ...state.posts.slice(0, state.posts.length - payload.length)]
                }
            } else {
                return {
                    ...state,
                    posts: [...payload.slice(0, 12), ...state.posts]
                }
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
        // dispatch(setLoading(true))

        getPost(str).then(res => {
            console.log(res)
            if (res.length) {
                console.log('-----------')
                dispatch(setPost(res))

            }
        })
    }
}

export const getAllPostThunk = (str) => {
    return (dispatch) => {
        // dispatch(setLoading(true))
        Promise.all([
            getPost('ria'),
            getPost('tass'),
            getPost('rt')
        ])
            .then(res => {
                console.log(res)
                if (res.length) {
                    console.log('-----------')
                    let data = res.reduce((ac, el) => ac.concat(el), [])
                    dispatch(setPost(data))

                }
            })
    }
}

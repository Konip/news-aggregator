import { combineReducers } from "redux";
import postReducers from "./posts-reducer";
import newspaperReducer from "./newspaper-reducer";


export const rootReducers = combineReducers({
    posts: postReducers,
    newspaper: newspaperReducer
})
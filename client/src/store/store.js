import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from "redux-thunk";
import postReducers from './posts-reducer.js';


export const rootReducers = combineReducers({
    posts: postReducers,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))

export default store

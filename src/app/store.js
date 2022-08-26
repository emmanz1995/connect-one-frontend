import thunk from "redux-thunk";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension'
import logger from 'redux-logger'
import rootReducer from './reducer'

const initialState = {}

const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware, logger)))

export default store
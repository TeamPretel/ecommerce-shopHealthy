import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import{catalogReducer} from '../reducers/index';

export const store = createStore(
    combineReducers({catalogReducer}), 
    composeWithDevTools(applyMiddleware(thunk))
);
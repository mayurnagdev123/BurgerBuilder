import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerReducer from './store/Reducers/reducer'
import authReducer from './store/Reducers/authReducer'
import {Provider} from 'react-redux'
const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
const rootReducer=combineReducers({
burgerReducer:burgerReducer,
authReducer:authReducer
})
const logger = store=>{
    return next =>{
        return action => {
            console.log("[Middleware] Dispatching action",action);
            const result=next(action);//sending ot reducer for operation
            console.log("[Middleware] result obtained is",result);
        }
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));
store.subscribe(()=>{
    console.log("[Index.js] Subscription notification", store.getState());
})


ReactDOM.render(<Provider store={store}>{app}</Provider> , document.getElementById( 'root' ) );
registerServiceWorker();

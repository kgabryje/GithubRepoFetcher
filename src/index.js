import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import repoListReducer from './store/reducers/repoList';
import searchMenuReducer from './store/reducers/searchMenu';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const reducer = combineReducers({
    repoList: repoListReducer,
    search: searchMenuReducer
});

const store = createStore(reducer, compose(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import CommentApp from './containers/CommentApp';
import commentReducer from './reducers/commentReducer';
import './index.css';
const store = createStore(commentReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
    <Provider store={store}>
      <CommentApp/>
    </Provider>
    , document.getElementById('root')
);

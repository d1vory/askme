import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.css'
import reducer from './store/reducers/auth'
import {createStore , compose, applyMiddleware} from 'redux'
import {Provider } from 'react-redux'
import thunk from 'redux-thunk'
import axios from 'axios'

axios.defaults.baseURL= 'http://127.0.0.1:8000'


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhances(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app, document.getElementById('root'))

/*
 * @Date: 2020-05-07 18:35:02
 * @LastEditors: Lq
 * @LastEditTime: 2020-05-18 12:30:27
 * @FilePath: /search/src/store/store.js
 */ 
import { createStore, applyMiddleware } from "redux"
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk"
import reducer from "./reducer.js"
let store = createStore(
    reducer,
    applyMiddleware(thunk, createLogger())
)

export default store

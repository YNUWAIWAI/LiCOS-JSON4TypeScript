import {global, indexedDB, socket} from 'client/village/constants/ActionTypes'
import {createStore} from 'redux'
import middleware from './middlewares'
import reducer from './reducers'

const store = createStore(
  reducer,
  middleware
)

store.dispatch({
  type: socket.INIT
})
store.dispatch({
  type: global.PROLOGUE
})

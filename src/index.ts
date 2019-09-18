import * as ActionTypes from 'client/village/constants/ActionTypes'
import {createStore} from 'redux'
import getMiddleware from './middlewares'
import {Process} from './middlewares/controller'
import reducer from './reducers'

export const connect = (process: Process) => {
  const store = createStore(
    reducer,
    getMiddleware(process)
  )

  store.dispatch({
    type: ActionTypes.socket.INIT
  })
  store.dispatch({
    type: ActionTypes.global.PROLOGUE
  })
}



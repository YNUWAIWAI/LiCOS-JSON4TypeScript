import * as ActionTypes from 'client/village/constants/ActionTypes'
import * as village from 'types/village'
import {createStore} from 'redux'
import getMiddleware from './middlewares'
import {ReducerState} from './reducers'
import reducer from './reducers'

export interface Process {
  sendChat: (
    send: (text: string) => void,
    json: village.Payload$playerMessage,
    state: ReducerState
  ) => void
  hunterVote: (
    send: (id: village.AgentId) => void,
    json: village.Payload$systemMessage,
    state: ReducerState
  ) => void
  noonVote: (
    send: (id: village.AgentId) => void,
    json: village.Payload$systemMessage,
    state: ReducerState
  ) => void
  seerVote: (
    send: (id: village.AgentId) => void,
    json: village.Payload$systemMessage,
    state: ReducerState
  ) => void
  werewolfVote: (
    send: (id: village.AgentId) => void,
    json: village.Payload$systemMessage,
    state: ReducerState
  ) => void
}
export const connect = (process: Process) => {
  const store = createStore(reducer, getMiddleware(process))

  store.dispatch({
    type: ActionTypes.socket.INIT
  })
  store.dispatch({
    type: ActionTypes.global.PROLOGUE
  })
}

import * as ActionTypes from '../client/src/scripts/village/constants/ActionTypes'
import * as village from '../types/village'
import {ReducerState} from './reducers'
import {createStore} from 'redux'
import getMiddleware from './middlewares'
import {postChat} from '../client/src/scripts/village/actions'
import reducer from './reducers'

export interface Process {
  sendPrivateChat: (
    send: (text: string) => void,
    json: village.Payload$playerMessage,
    state: ReducerState
  ) => void
  sendPublicChat: (
    send: (text: string) => void,
    json: village.Payload$playerMessage,
    state: ReducerState
  ) => void
  sendWerewolfChat: (
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

  const sendPrivateChat = (text: string) => {
    postChat({
      channel: village.InputChannel.private,
      text
    })
  }
  const sendPublicChat = (text: string) => {
    postChat({
      channel: village.InputChannel.public,
      text
    })
  }
  const sendWerewolfChat = (text: string) => {
    postChat({
      channel: village.InputChannel.limited,
      text
    })
  }

  return {
    sendPrivateChat,
    sendPublicChat,
    sendWerewolfChat
  }
}

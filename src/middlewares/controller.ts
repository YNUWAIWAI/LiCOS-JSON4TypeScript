import * as village from 'types/village'
import * as ActionTypes from 'client/village/constants/ActionTypes'
import {Middleware} from '.'
import {ReducerState} from '../reducers'
import {postChat, selectOption} from 'client/village/actions'

export interface Process {
  sendChat: (send: (text: string) => void, json: village.Payload$playerMessage, state: ReducerState) => void
  hunterVote: (send: (id: village.AgentId) => void, json: village.Payload$systemMessage, state: ReducerState) => void
  noonVote: (send: (id: village.AgentId) => void, json: village.Payload$systemMessage, state: ReducerState) => void
  seerVote: (send: (id: village.AgentId) => void, json: village.Payload$systemMessage, state: ReducerState) => void
  werewolfVote: (send: (id: village.AgentId) => void, json: village.Payload$systemMessage, state: ReducerState) => void
}
const controller: (process: Process) => Middleware = process => store => next => action => {
  const chat = (text: string) => {
    store.dispatch(
      postChat({
        channel: village.InputChannel.public,
        text
      })
    )
  }
  const vote = (id: village.AgentId) => {
    store.dispatch(
      selectOption(id)
    )
  }

  switch (action.type) {
    case ActionTypes.socket.MESSAGE: {
      const payload = action.payload
      const state = store.getState()

      switch (payload['@payload']) {
        case village.Message.playerMessage: {
          process.sendChat(chat, payload, state)
          break
        }
        case village.Message.systemMessage: {
          switch (payload.phase) {
            case village.Phase.day: {
              process.noonVote(vote, payload, state)
              break
            }
            case village.Phase.night: {
              const role = state.mine.role

              if (typeof role === 'undefined') {
                break
              }
              switch (role.id) {
                case village.RoleId.hunter: {
                  process.hunterVote(vote, payload, state)
                  break
                }
                case village.RoleId.seer: {
                  process.seerVote(vote, payload, state)
                  break
                }
                case village.RoleId.werewolf: {
                  process.werewolfVote(vote, payload, state)
                  break
                }
              }
            }
          }
        }
      }

      return next(action)
    }
    default:
      return next(action)
  }
}

export default controller

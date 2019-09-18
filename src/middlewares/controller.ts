import * as ActionTypes from 'client/village/constants/ActionTypes'
import * as village from 'types/village'
import {Middleware} from '.'
import {postChat, selectOption} from 'client/village/actions'
import {Process} from '..'

const controller: (
  process: Process
) => Middleware = process => store => next => action => {
  const chat = (text: string) => {
    store.dispatch(
      postChat({
        channel: village.InputChannel.public,
        text
      })
    )
  }
  const vote = (id: village.AgentId) => {
    store.dispatch(selectOption(id))
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

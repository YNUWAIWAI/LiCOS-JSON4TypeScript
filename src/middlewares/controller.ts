import * as ActionTypes from '../../client/src/scripts/village/constants/ActionTypes'
import * as village from '../../types/village'
import {Middleware} from '.'
import {postChat, selectOption} from '../../client/src/scripts/village/actions'
import {Process} from '..'

const controller: (
  process: Process
) => Middleware = process => store => next => action => {
  const chat = (channel: village.InputChannel) => (text: string) => {
    store.dispatch(
      postChat({
        channel,
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
          process.sendPrivateChat(chat(village.InputChannel.private), payload, state)
          process.sendPublicChat(chat(village.InputChannel.public), payload, state)
          process.sendWerewolfChat(chat(village.InputChannel.limited), payload, state)
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

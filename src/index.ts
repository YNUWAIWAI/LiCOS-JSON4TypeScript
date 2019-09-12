import * as village from 'types/village'
import {global, socket} from 'client/village/constants/ActionTypes'
import {createStore} from 'redux'
import {postChat, selectOption} from 'client/village/actions'
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

export const sendChat = (text: string) => {
  store.dispatch(
    postChat({
      channel: village.InputChannel.public,
      text
    })
  )
}
export const hunterVote = (id: village.AgentId) => {
  store.dispatch(
    selectOption(id)
  )
}
export const noonVote = (id: village.AgentId) => {
  store.dispatch(
    selectOption(id)
  )
}
export const seerVote = (id: village.AgentId) => {
  store.dispatch(
    selectOption(id)
  )
}
export const werewolfVote = (id: village.AgentId) => {
  store.dispatch(
    selectOption(id)
  )
}

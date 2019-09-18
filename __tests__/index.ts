import {connect} from '../src'

test('test', () => {
  const socket = connect({
    hunterVote: (send, json, state) => {
      send('0')
    },
    noonVote: (send, json, state) => {
      send('0')
    },
    seerVote: (send, json, state) => {
      send('0')
    },
    sendChat: (send, json, state) => {
      send('text')
    },
    werewolfVote: (send, json, state) => {
      send('0')
    }
  })
  expect(1).toBe(1)
})

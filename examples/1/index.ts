import {connect} from '@licos/json4typescript'

const randInt = (max: number) => Math.floor(Math.random() * Math.floor(max))
connect({
  hunterVote: (send, json, state) => {
    if (json.agent) {
      const agent = json.agent.filter(a => a.isAChoice)

      send(String(agent[randInt(agent.length)].id))
    }
  },
  noonVote: (send, json, state) => {
    if (json.agent) {
      const agent = json.agent.filter(a => a.isAChoice)

      send(String(agent[randInt(agent.length)].id))
    }
  },
  seerVote: (send, json, state) => {
    if (json.agent) {
      const agent = json.agent.filter(a => a.isAChoice)

      send(String(agent[randInt(agent.length)].id))
    }
  },
  sendPrivateChat: (send, json, state) => {
    send('text')
  },
  sendPublicChat: (send, json, state) => {
    send('text')
  },
  sendWerewolfChat: (send, json, state) => {
    send('text')
  },
  werewolfVote: (send, json, state) => {
    if (json.agent) {
      const agent = json.agent.filter(a => a.isAChoice)

      send(String(agent[randInt(agent.length)].id))
    }
  }
})

import * as ActionTypes from '../../client/src/scripts/village/constants/ActionTypes'
import * as actions from '../../client/src/scripts/village/actions'
import {Dispatch, MiddlewareAPI, applyMiddleware} from 'redux'
import {Process} from '..'
import {ReducerState} from '../reducers'
import client2server from './client2server'
import controller from './controller'
import flavorText from '../../client/src/scripts/village/middlewares/flavorText'
import socket from '../../client/src/scripts/village/middlewares/socket'
import timeWatcher from '../../client/src/scripts/village/middlewares/timeWatcher'
import timer from '../../client/src/scripts/village/middlewares/timer'

type Action =
  | actions.ActivateNextButton
  | actions.ChangeDate
  | actions.ChangeLanguage
  | actions.ChangePhase
  | actions.ChangePredictionBoard
  | actions.ClickHideButton
  | actions.ClickNavigationButton
  | actions.DeactivateNextButton
  | actions.HidePredictionSpec
  | actions.HideResult
  | actions.PostChat
  | actions.Ready
  | actions.SelectNo
  | actions.SelectOption
  | actions.ShowLobby
  | actions.ShowPredictionSpec
  | actions.SelectYes
  | actions.SocketClose
  | actions.SocketError
  | actions.SocketMessage
  | actions.SocketOpen
  | actions.SocketSend
  | actions.StarChat
  | actions.Tick
  | {type: ActionTypes.socket.INIT}
  | {type: ActionTypes.global.PROLOGUE}

export type Middleware = (
  store: MiddlewareAPI<Dispatch<Action>, ReducerState>
) => (next: Dispatch<Action>) => (action: Action) => Action

const url = 'url'
const getMiddleware = (process: Process) =>
  applyMiddleware(
    socket({
      url
    }),
    client2server,
    controller(process),
    flavorText,
    timer,
    timeWatcher
  )

export default getMiddleware

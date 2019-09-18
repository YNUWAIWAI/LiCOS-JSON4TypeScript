import base, {State as baseState} from 'client/village/reducers/base'
import chat, {State as chatState} from 'client/village/reducers/chat'
import command, {State as commandState} from 'client/village/reducers/command'
import commandGrave, {
  State as commandGraceState
} from 'client/village/reducers/commandGrave'
import commandInputBox, {
  State as commandInputBoxState
} from 'client/village/reducers/commandInputBox'
import commandPostMortem, {
  State as commandPostMortemState
} from 'client/village/reducers/commandPostMortem'
import commandSelection, {
  State as commandSelectionState
} from 'client/village/reducers/commandSelection'
import language, {
  State as languageState
} from 'client/village/reducers/language'
import mine, {State as mineState} from 'client/village/reducers/mine'
import result, {State as resultState} from 'client/village/reducers/result'
import {combineReducers} from 'redux'

const reducer = combineReducers({
  base,
  chat,
  command,
  commandGrave,
  commandInputBox,
  commandPostMortem,
  commandSelection,
  language,
  mine,
  result
})

export default reducer

export interface ReducerState {
  readonly base: baseState
  readonly chat: chatState
  readonly command: commandState
  readonly commandGrave: commandGraceState
  readonly commandInputBox: commandInputBoxState
  readonly commandPostMortem: commandPostMortemState
  readonly commandSelection: commandSelectionState
  readonly language: languageState
  readonly mine: mineState
  readonly result: resultState
}

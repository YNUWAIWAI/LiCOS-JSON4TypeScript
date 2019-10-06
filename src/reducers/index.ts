import base, {State as baseState} from '../../client/src/scripts/village/reducers/base'
import chat, {State as chatState} from '../../client/src/scripts/village/reducers/chat'
import command, {State as commandState} from '../../client/src/scripts/village/reducers/command'
import commandGrave, {
  State as commandGraceState
} from '../../client/src/scripts/village/reducers/commandGrave'
import commandInputBox, {
  State as commandInputBoxState
} from '../../client/src/scripts/village/reducers/commandInputBox'
import commandPostMortem, {
  State as commandPostMortemState
} from '../../client/src/scripts/village/reducers/commandPostMortem'
import commandSelection, {
  State as commandSelectionState
} from '../../client/src/scripts/village/reducers/commandSelection'
import language, {
  State as languageState
} from '../../client/src/scripts/village/reducers/language'
import mine, {State as mineState} from '../../client/src/scripts/village/reducers/mine'
import result, {State as resultState} from '../../client/src/scripts/village/reducers/result'
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

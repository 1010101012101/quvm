/**
 * @class Machine
 */
import State from './state'

export default class Machine {
  run(code, file) {
    const state = new State()
    const ops = state.createOperationsFromCode(code, file)
    state.runOperations(ops)
    return state
  }
}

/**
 * @class Machine
 */
import State from './state'

export default class Machine {
  constructor() {

  }

  run(code, file) {
    const state = new State()
    const ops = state.createOperationsFromCode(code, file)
    ops.forEach(op => op.execute(state))
  }
}

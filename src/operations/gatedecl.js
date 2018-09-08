
import BaseOperation from './base'

class Gate {
  /**
   * @constructor
   * @param {string} name
   * @param {Array<string>} params
   * @param {Array<string>} qargs
   * @param {Array<BaseOperation>} body
   */
  constructor(name, params, qargs, body) {
    this.name = name
    this.params = params
    this.qargs = qargs
    this.body = body
  }

  /**
   *
   * @param {State} state
   * @param {Array} paramValues
   * @param {Array} qargValues
   */
  execute(state, paramValues, qargValues) {
    const context = {}
    paramValues.forEach((looper, i) => context[this.params[i]] = looper)
    qargValues.forEach((looper, i) => context[this.qargs[i]] = looper)
    state.runInSubScope(context, this.body)
  }
}

export default class GateDeclOperation extends BaseOperation {
  /**
   *
   * @param {State} state
   */
  execute(state) {
    const [gatename, params, qargs, body] = this.args
    const gate = new Gate(gatename, params, qargs, body)
    state.addToCurrentScope(gatename, gate)
  }
}

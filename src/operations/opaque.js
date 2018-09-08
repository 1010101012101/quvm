
import BaseOperation from './base'

class OpaqueGate {
  /**
   * @constructor
   * @param {string} name
   * @param {Array<string>} params
   * @param {Array<string>} qargs
   */
  constructor(name, params, qargs) {
    this.name = name
    this.params = params
    this.qargs = qargs
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
    // TODO
  }
}

export default class OpaqueDeclOperation extends BaseOperation {
  /**
   *
   * @param {State} state
   */
  execute(state) {
    const [gatename, params, qargs] = this.args
    const gate = new OpaqueGate(gatename, params, qargs)
    state.addToCurrentScope(gatename, gate)
  }
}


import BaseOperation from './base'

class Gate {
  /**
   * @constructor
   * @param {string} name
   * @param {Array<string>} params
   * @param {Array<string>} qargs
   * @param {Array<BaseOperation>} body
   */
  constructor(name, params = [], qargs = [], body = []) {
    this.name = name
    this.params = params.map(({args}) => args[0])
    this.qargs = qargs.map(({args}) => args[0])
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
    const bodyOps = this.body.map(looper => state.operationFromConfig(looper))
    state.runInSubScope(context, bodyOps)
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

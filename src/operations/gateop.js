import BaseOperation from './base';

export default class GateOperation extends BaseOperation {
  execute(state) {
    const [gatename, params, qargs] = this.args
    const paramValues = state.evaluateExpressionList(params)
    const qargValues = state.evaluateExpressionList(qargs)
    const gate = state.resolve(gatename)
    gate.execute(state, paramValues, qargValues)
    console.log(10, gatename, gate.body)
    state.cleanResultStack()
  }
}

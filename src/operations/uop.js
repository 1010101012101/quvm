import BaseOperation from './base'
import {U} from './builtin'

function flatten(array) {
  return array.map(looper => {
    if (Array.isArray(looper) && looper.length === 1) {
      return looper[0]
    }
    return looper
  })
}

export default class UOperation extends BaseOperation {
  execute(state) {
    const [exps, qubits] = this.args
    const array = flatten(exps)

    const expList = array.map(looper => state.operationFromConfig(looper))
    const params = flatten(state.evaluateExpressionList(expList))
    const qids = state.resolveList(qubits)
    const [theta, phi, lambda] = params
    U(theta, phi, lambda).or(qids)
  }
}

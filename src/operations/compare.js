import BaseOperation from './base'

export default class CompareOperation extends BaseOperation {
  execute(state) {
    const [cregName, int, body] = this.args
    const creg = state.resolve(cregName)
    let sum = 0
    creg.forEach(looper => sum += looper)
    if (sum === int) {
      body.forEach(op => op.execute(state))
    }
  }
}

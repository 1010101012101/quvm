import {ops} from 'projectq'
import BaseOperation from './base'

const {All, Measure} = ops

export default class MeasureOperation extends BaseOperation {
  execute(state) {
    const [quregName, cregName] = this.args
    const qureg = state.resolve(quregName)
    const creg = state.resolve(cregName)
    new All(Measure).or(qureg)
    qureg.forEach((qubit, i) => {
      const value = state.engine.getMeasurementResult(qubit)
      creg[i] = value
    })
  }
}

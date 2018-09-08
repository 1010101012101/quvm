import BaseOperation from './base'
import {ops} from 'projectq'
import {tuple} from 'projectq/dist/libs/util'

const {CNOT} = ops

export default class CXOperation extends BaseOperation {
  /**
   *
   * @param {State} state
   */
  execute(state) {
    const [controlIDs, qubits] = this.args
    const cids = state.resolveList(controlIDs)
    const qids = state.resolveList(qubits)
    CNOT(tuple(qids, cids))
  }
}

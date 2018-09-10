import BaseOperation from './base'

export default class UOperation extends BaseOperation {
  execute(state) {
    const [controlIDs, qubits] = this.args
    const cids = state.resolveList(controlIDs)
    const qids = state.resolveList(qubits)
    // TODO
    console.log(9, typeof cids, typeof qids)
  }
}

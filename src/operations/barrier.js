import {ops} from 'projectq'
import BaseOperation from './base'

const {Barrier} = ops

export default class BarrierOperation extends BaseOperation {
  /**
   *
   * @param {State} state
   */
  execute(state) {
    const [idlist] = this.args
    const operations = idlist.map(looper => state.createOperation(looper))
    const list = operations.forEach(looper => looper.execute())
    Barrier.or(list)
  }
}

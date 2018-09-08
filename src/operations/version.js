import BaseOperation from './base'

export const kVersionKey = '$__VERSION'

export default class VersionOperation extends BaseOperation {
  /**
   *
   * @param {State} state
   */
  execute(state) {
    const [version] = this.args
    state.addToGlobal(kVersionKey, version)
  }
}

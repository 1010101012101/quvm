import BaseOperation from './base'
import Library from '../library'

export default class IncludeOperation extends BaseOperation {
  /**
   *
   * @param {State} state
   */
  execute(state) {
    const [libraryName] = this.args
    const library = new Library(libraryName)
    library.load(state)
  }
}

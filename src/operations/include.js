import BaseOperation from './base'
import Library from '../library'

export default class IncludeOperation extends BaseOperation {
  /**
   *
   * @param {State} state
   */
  execute(state) {
    let [libraryName] = this.args
    // trim the `"` characters in string literal
    libraryName = libraryName.substring(1, libraryName.length - 1)
    const library = new Library(libraryName)
    library.load(state)
  }
}

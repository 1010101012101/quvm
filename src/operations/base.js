export default class BaseOperation {
  constructor(code, args, fileName, sourceCode, line) {
    this._code = code
    this.args = args
    this.sourceFileName = fileName
    this.sourceCode = sourceCode
    this.line = line
  }

  /**
   * @return {number}
   */
  get code() {
    return this._code
  }

  /**
   * @param {State} state
   */
  execute(state) {
    //
  }

  /**
   * @return {string}
   */
  toString() {
    return `${this.constructor.name}(${this.sourceCode || ''})`
  }
}

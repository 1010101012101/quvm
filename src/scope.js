/**
 * @class Scope
 */
export default class Scope {
  /**
   * @constructor
   * @param {Scope} superScope
   * @param {{[string]: *}} values
   */
  constructor(superScope, values = {}) {
    this.super = superScope
    this.pool = values
  }

  /**
   *
   * @returns {boolean}
   */
  isGlobal() {
    return typeof this.super === 'undefined'
  }

    /**
     * @param {string} name
     * @param {*} value
     */
  addValue(name, value) {
    this.pool[name] = value
  }

  /**
   *
   * @param {string} name
   * @return {*|void}
   */
  resolve(name) {
    let scoperLooper = this
    while (scoperLooper) {
      const value = scoperLooper.pool[name]
      if (typeof value !== 'undefined') {
        return value
      }
      scoperLooper = scoperLooper.super
    }
    // can't resolve throw error
    throw new Error(`Un-resolved identifier: ${name}`)
  }
}

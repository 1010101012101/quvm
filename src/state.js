/**
 * qasm program state
 * @class State
 */
import {cengines} from 'projectq'
import Scope from './scope'
const {MainEngine} = cengines

export default class State {
  /**
   *
   */
  constructor() {
    this.engine = new MainEngine()
    this.scope = new Scope()
    this.current = this.scope
    this.global = this.scope
  }

  /**
   *
   * @param {string} name
   * @param {*} value
   */
  addToGlobal(name, value) {
    this.global[name] = value
  }

  /**
   *
   * @param {string} name
   * @param {*} value
   */
  addToCurrentScope(name, value) {
    this.current.addValue(name, value)
  }

  /**
   *
   * @param {string} name
   */
  resolve(name) {
    return this.current.resolve(name)
  }

  /**
   *
   * @param {BaseOperation} exp
   */
  evaluateExpression(exp) {
    const [value] = this.evaluateExpressionList([exp])
    return value
  }

  /**
   *
   * @param {BaseOperation[]} exps
   */
  evaluateExpressionList(exps) {

  }

  /**
   *
   * @param {string[]}nameList
   * @return {*}
   */
  resolveList(nameList) {
    return nameList.map(name => this.resolve(name))
  }
}

/**
 * qasm program state
 * @class State
 */
import {cengines} from 'projectq'
import {parse} from 'qasm'
import BaseOperation from './operations/base'
import Scope from './scope'
import operations from './operations'
const {MainEngine} = cengines

export default class State {
  /**
   *
   */
  constructor() {
    /**
     * @type {MainEngine}
     */
    this.engine = new MainEngine()
    this.scope = new Scope()
    this.current = this.scope
    this.global = this.scope
    this.resultStack = []
  }

  cleanResultStack() {
    this.resultStack = []
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
    let value = exp
    if (exp instanceof BaseOperation) {
      value = exp.execute(this)
    }
    this.resultStack.push(value)
  }

  /**
   *
   * @param {BaseOperation[]} exps
   */
  evaluateExpressionList(exps) {
    exps.forEach(looper => this.evaluateExpression(looper))
    const result = this.resultStack
    this.cleanResultStack()
    return result
  }

  /**
   * run `ops` in a sub-scope, with `context` to resolve variables
   * @param {Object<string, *>} context
   * @param {Array<BaseOperation>} ops
   */
  runInSubScope(context, ops) {
    const scope = new Scope(this.current, context)
    this.current = scope
    ops.forEach(looper => looper.execute(this))
    this.current = this.current.super
  }

  /**
   *
   * @param {string[]}nameList
   * @return {*}
   */
  resolveList(nameList) {
    return nameList.map(name => this.resolve(name))
  }

  /**
   * @param {string} sourceCode
   * @param {string} file
   * @return {Array<BaseOperation>}
   */
  createOperationsFromCode(sourceCode, file = '') {
    const result = parse(sourceCode)
    const {value} = result
    const ops = []
    if (value && value.length > 0) {
      value.forEach(looper => {
        const Cls = operations[looper.code]
        if (Cls) {
          console.log(looper)
          const op = new Cls(looper.code, looper.args, file, sourceCode)
          ops.push(op)
        } else {
          throw new Error(`unknown operation: ${looper.code}`)
        }
      })
    }
    return ops
  }
}

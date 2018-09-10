/**
 * qasm program state
 * @class State
 */
import {cengines} from 'projectq'
import {parse} from 'qasm'
import BaseOperation from './operations/base'
import Scope from './scope'
import operations from './operations'
import Library from './library'

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

    Library.addSearchPath(__dirname)
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
   * @param {string} arg
   */
  resolve(arg) {
    if (typeof arg === 'string') {
      return this.current.resolve(arg)
    } else {
      const [name] = arg.args
      return this.current.resolve(name)
    }
  }

  /**
   *
   * @param {BaseOperation} exp
   */
  evaluateExpression(exp) {
    let value = exp
    if (exp instanceof BaseOperation) {
      value = exp.execute(this)
    } else {
      const {code, args} = exp
      if (code && args) {
        exp = this.operationFromConfig(exp)
        value = exp.execute(this)
      }
    }
    this.resultStack.push(value)
  }

  /**
   *
   * @param {BaseOperation[]} exps
   * @return {Array|any}
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
    if (Array.isArray(nameList)) {
      return nameList.map(this.resolve)
    } else {
      return this.resolve(nameList)
    }
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
      value.forEach((looper) => {
        ops.push(this.operationFromConfig(looper, sourceCode, file))
      })
    }
    return ops
  }

  operationFromConfig(config, sourceCode, file) {
    const Cls = operations[config.code]
    if (Cls) {
      return new Cls(config.code, config.args, file, sourceCode)
    } else {
      throw new Error(`unknown operation: ${config.code}`)
    }
  }
}

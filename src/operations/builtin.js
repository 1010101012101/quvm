import math from 'mathjs'
import {ops} from 'projectq'
import BaseOperation from "./base";

const {BasicGate, X, Y, Z} = ops

const EPSILON = 1e-13

function trimValue(value) {
  if (math.im(value) < EPSILON) {
    const real = math.re(value)
    return real < EPSILON ? 0 : real
  }
  if (math.abs(value) < EPSILON) {
    return 0
  }
  return value
}

function iexp(angle) {
  return math.complex(Math.cos(angle), Math.sin(angle))
}

export function UMatrix(theta, phi, lambda) {
  const mm = math.multiply
  const cost = Math.cos(theta / 2)
  const sint = Math.sin(theta / 2)

  const a = mm(iexp(-(phi + lambda) / 2), cost)
  const b = mm(iexp(-(phi - lambda) / 2), -sint)
  const c = mm(iexp((phi - lambda) / 2), sint)
  const d = mm(iexp((phi + lambda) / 2), cost)
  return math.matrix([
    [trimValue(a), trimValue(b)],
    [trimValue(c), trimValue(d)]
  ])
}

class UnitaryGate extends BasicGate {
  constructor(theta, phi, lambda) {
    super()
    this.theta = theta
    this.phi = phi
    this.lambda = lambda
    this._matrix = UMatrix(this.theta, this.phi, this.lambda)
  }

  toString() {
    return 'U'
  }

  get matrix() {
    return this._matrix
  }
}

export function U(theta, phi, lambda) {
  const gate = new UnitaryGate(theta, phi, lambda)
  return gate
}

class BuiltInGateOperation {
  constructor(g) {
    this.g = g
  }

  execute(state, paramValues, qargValues) {
    this.g.or(qargValues)
  }
}

export function getBuiltInGates() {
  return {
    x: new BuiltInGateOperation(X),
    y: new BuiltInGateOperation(Y),
    z: new BuiltInGateOperation(Z)
  }
}

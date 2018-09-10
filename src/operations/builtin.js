import math from 'mathjs'
import {ops} from 'projectq'
import {tuple} from 'projectq/dist/libs/util'

const {BasicGate, X, Y, Z, CX, Toffoli} = ops

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
  constructor(g, is1qubitGate) {
    this.g = g
    this.is1qubitGate = is1qubitGate
  }

  execute(state, paramValues, qargValues) {
    if (this.is1qubitGate) {
      qargValues.forEach(looper => this.g.or(tuple(looper)))
    } else {
      this.g.or(tuple(...qargValues))
    }
  }
}

export function getBuiltInGates() {
  const toffoli = new BuiltInGateOperation(Toffoli)
  return {
    x: new BuiltInGateOperation(X, true),
    y: new BuiltInGateOperation(Y, true),
    z: new BuiltInGateOperation(Z, true),
    cx: new BuiltInGateOperation(CX),
    ccx: toffoli
  }
}

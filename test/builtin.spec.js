import {expect} from 'chai'
import math from 'mathjs'
import {U} from '../src/builtin'
import {ops} from 'projectq'
const {Rx, Ry, Rz} = ops

describe('builtin test', () => {
  it('should test U', () => {
    const g = U(Math.PI, 0, Math.PI)
    expect(g.toString()).to.equal('U')
    const rx1 = new Rx(0)
    console.log(rx1.matrix._data, U(0, -Math.PI / 2, -Math.PI / 2).matrix._data)
  });
})

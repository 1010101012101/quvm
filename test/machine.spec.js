import {expect} from 'chai'
import path from 'path'
import fs from 'fs'
import Machine from '../src/machine'

describe('machine test', () => {
  // it('should parse qasm source code', () => {
  //   const content = fs.readFileSync(path.resolve(__dirname, './test1.qasm'), {encoding: 'utf8'})
  //   const vm = new Machine()
  //   const state = vm.run(content, 'test1.qasm')
  //   expect(state.resolve('c')).to.deep.equal([true, false, false, false, false])
  // })
  //
  // it('should run teleport', () => {
  //   const content = fs.readFileSync(path.resolve(__dirname, './teleport.qasm'), {encoding: 'utf8'})
  //   const vm = new Machine()
  //   const state = vm.run(content, 'teleport.qasm')
  //   expect(state.resolve('c')).to.deep.equal([true, false, false, false, false])
  // })

  // it('should run teleport', () => {
  //   const content = fs.readFileSync(path.resolve(__dirname, './example.qasm'), {encoding: 'utf8'})
  //   const vm = new Machine()
  //   const state = vm.run(content, 'example.qasm')
  //   console.log(state.resolve('c'))
  // })

  it('should run adder', () => {
    const content = fs.readFileSync(path.resolve(__dirname, './qasm/adder.qasm'), {encoding: 'utf8'})
    const vm = new Machine()
    const state = vm.run(content, 'adder.qasm')
    console.log(state.resolve('c'))
  })
})

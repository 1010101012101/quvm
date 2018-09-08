import {expect} from 'chai'
import path from 'path'
import fs from 'fs'
import Machine from '../src/machine'

describe('machine test', () => {
  it('should parse qasm source code', function () {
    const content = fs.readFileSync(path.resolve(__dirname, './test1.qasm'), {encoding: 'utf8'})
    const vm = new Machine()
    const state = vm.run(content, 'test1.qasm')
    console.log(state.resolve('c'))
  });
})

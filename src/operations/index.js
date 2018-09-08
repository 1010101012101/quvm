import {OPCode} from 'qasm'
import IndexOperation from './_index'
import BarrierOperation from './barrier'
import CXOperation from './cxop'
import DeclOperation from './decl'
import GateDeclOperation from './gatedecl'
import IncludeOperation from './include'
import MeasureOperation from './measure'
import VersionOperation from './version'
import OpaqueDeclOperation from './opaque'
import CompareOperation from './compare'
import GateOperation from './gateop'
import UOperation from './uop'

const {
  OP_INDEX, OP_ARRAY_INDEX, OP_BARRIER, OP_CX, OP_DECL_QREG, OP_DECL_CREG,
  OP_DECL_GATE, OP_INCLUDE, OP_MEASURE, OP_VERSION, OP_OPAQUE, OP_TEST,
  OP_GATE_OP, OP_U
} = OPCode

export default {
  [OP_INDEX]: IndexOperation,
  [OP_ARRAY_INDEX]: IndexOperation,
  [OP_BARRIER]: BarrierOperation,
  [OP_CX]: CXOperation,
  [OP_DECL_QREG]: DeclOperation,
  [OP_DECL_CREG]: DeclOperation,
  [OP_DECL_GATE]: GateDeclOperation,
  [OP_INCLUDE]: IncludeOperation,
  [OP_MEASURE]: MeasureOperation,
  [OP_VERSION]: VersionOperation,
  [OP_OPAQUE]: OpaqueDeclOperation,
  [OP_TEST]: CompareOperation,
  [OP_GATE_OP]: GateOperation,
  [OP_U]: UOperation
}

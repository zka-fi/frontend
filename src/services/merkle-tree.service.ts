import { createSMT, proofByIndex} from 'zkafi-merkle-tree'
import { zkCredential } from '../utils/credential'

const couchdbConfig = {
  user: 'admin',
  password: 'WsonEYErSarDsODisHALigUN',
  host: '35.161.69.148'
}

export async function proofMerkleTree (tree: any, amount: number) {
  const [root] = tree.layers[tree.layers.length - 1]
  const proof = await proofByIndex(
    4,
    amount,
    root,
    couchdbConfig
  )
  return proof
} 

export async function createMerkleTree () {
  const amount = Math.floor(Math.random() * 999999999999) 
  const now = new Date()
  const time = new Date()
  time.setFullYear(now.getFullYear() + 1)
  return {
    tree: await createSMT([
    { 
      index: 0,
      value: zkCredential,
    },
    { 
      index: 1,
      value: '0xfa5e07F1634730A5006969B52fb808DecCBF6910'
    },
    { 
      index: 2,
      value: '0x4c3634736a8d1a6296cd79a200ee7729476de474'
    },
    { 
      index: 3,
      value: time.getTime(),
    },
    { 
      index: 4,
      value: amount,
    },
    { 
      index: 5,
      value: 0,
    },
    { 
      index: 6,
      value: 'value'
    },
    { 
      index: 7,
      value: 'value'
    },
  ], couchdbConfig),
    amount,
  }
}
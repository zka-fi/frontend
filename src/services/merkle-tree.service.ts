import { createSMT, proofByIndex} from 'zkafi-merkle-tree'
import { zkCredential } from '../utils/credential'
import { invokeFormat } from '../utils/ether-big-number'

const couchdbConfig = {
  user: 'admin',
  password: 'WsonEYErSarDsODisHALigUN',
  host: '35.89.79.195'
}

export async function proofMerkleTree (tree: any, amount: number) {
  const [root] = tree.layers[tree.layers.length - 1]
  const proof = await proofByIndex(
    4,
    invokeFormat(amount.toString()).toString(),
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
  const credential = zkCredential
  const address = '0xfa5e07F1634730A5006969B52fb808DecCBF6910'
  const issuer = '0x4c3634736a8d1a6296cd79a200ee7729476de474'
  const expired = time.getTime()
  const value = amount
  const revoke = 0
  const payload = {
    credential,
    address,
    issuer,
    expired,
    value,
    revoke,
  }
  return {
    tree: await createSMT([
      { 
        index: 0,
        value: credential,
      },
      { 
        index: 1,
        value: address,
      },
      { 
        index: 2,
        value: issuer
      },
      { 
        index: 3,
        value: expired,
      },
      { 
        index: 4,
        value: value,
      },
      { 
        index: 5,
        value: revoke,
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
    payload,
  }
}
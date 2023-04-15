import { createSMT, proofByIndex} from 'zkafi-merkle-tree'

const couchdbConfig = {
  user: 'admin',
  password: 'WsonEYErSarDsODisHALigUN',
  host: '35.161.69.148'
}

export async function proofMerkleTree (tree: any) {
  const [root] = tree.layers[tree.layers.length - 1]
  const proof = await proofByIndex(
    4,
    9527,
    root,
    couchdbConfig
  )
  return proof
} 

export async function createMerkleTree () { 
  return await createSMT([
    { 
      index: 0,
      value: 'value'
    },
    { 
      index: 1,
      value: 'value'
    },
    { 
      index: 2,
      value: 'value'
    },
    { 
      index: 3,
      value: 'value'
    },
    { 
      index: 4,
      value: 'value'
    },
    { 
      index: 5,
      value: 'value'
    },
    { 
      index: 6,
      value: 'value'
    },
    { 
      index: 7,
      value: 'value'
    },
  ], couchdbConfig)
}
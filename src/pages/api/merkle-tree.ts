import { createMerkleTree, proofMerkleTree } from "../../services/merkle-tree.service"

async function handler (_: Request, response: any) {
  const tree = await createMerkleTree()
  const proof = await proofMerkleTree(tree.tree, tree.amount)

  // 傳送data到頁面的props
  return response.send({ 
    data: {
      tree,
      proof,
    }
  })
}

export default handler
import { resolve } from "path";
import { ApplyForm } from "../components/Form/ApplyForm";
import { createMerkleTree, proofMerkleTree } from "../services/merkle-tree.service";


function Page({ data }: {
  data: {
    tree: any,
    proof: any,
  }
}) {
  return (
    <>
      <ApplyForm />
    </>
  )
}

export async function getServerSideProps() {
  // 呼叫其他api拿取資料
  const tree = await createMerkleTree()
  const proof = await proofMerkleTree(tree)

  // 傳送data到頁面的props
  return { 
    props: 
    { 
      data: {
        tree,
        proof,
      }
    }
  }
}

export default Page

// export default function MerkleTree () {
//   return (
//     <>
//       <ApplyForm />
//     </>
//   )
// }
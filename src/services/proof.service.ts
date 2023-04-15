import { BigNumber } from "ethers"

const groth16 = require('snarkjs').groth16

export async function exportSolidity({ proof, publicSignals }: any) {
  const rawCallData: string = await groth16.exportSolidityCallData(proof, publicSignals);
  const tokens = rawCallData
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map(BigNumber.from);
  const [a1, a2, b1, b2, b3, b4, c1, c2, ...inputs] = tokens;
  const a: [BigNumber, BigNumber] = [a1, a2] ;
  const b: [[BigNumber, BigNumber], [BigNumber, BigNumber]] = [
    [b1, b2],
    [b3, b4],
  ]
  const c: [BigNumber, BigNumber] = [c1, c2]
  return {
    a, b, c, inputs
  }
}

export async function generateProof(circuitInputs: any, filePathWASM: any, filePathZKEY: any) {
  const { proof, publicSignals } = await groth16.fullProve(
    circuitInputs,
    filePathWASM,
    filePathZKEY
  )
  const solidityProof = await exportSolidity({ proof, publicSignals })
  return solidityProof
}
// TODO: generate proof for test circuit
export async function createProof() {
  const WASM_FILE_PATH = "/base.wasm"
  const ZKEY_FILE_PATH = "/base.zkey"

  const circuitInputs = {
    accountRoot: "0x27d7d6e3a855c2cff1234b9c249f25c97efaa6e1f67309dbe9f3c1983e3302d6",
    certValue: 9527,
    path: [
      "0x2a09a9fd93c590c26b91effbb2499f07e8f7aa12e2b4940a3aed2411cb65e11c",
      "0x231be438cf8d6a322f51a7182ae96fb67aa3a7d1673abecc96955fa51f6d7168",
      "0x2258b1ae87b52b884ce173eb875bd74d675401aa4dc20c8989f080ce517f4c30"
    ],
    idx: [ 0, 0, 1 ],
    borrowAmount: 100,
  }

  const proofData = await generateProof(
    circuitInputs,
    WASM_FILE_PATH,
    ZKEY_FILE_PATH
  )
  return proofData
}


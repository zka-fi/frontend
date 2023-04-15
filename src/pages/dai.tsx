import { Button, Card, CircularProgress, Grid } from "@mui/material";
import { generateProof } from "../services/proof.service";
import { BorrowForm } from "../components/Form/BorrowForm";
import { useState } from "react"
import { writeContract, prepareWriteContract } from '@wagmi/core'
import { useAccount, useFeeData } from "wagmi";
import { zkafiABI } from "../contracts/zkafi";
import { BigNumber } from "ethers";
import { RepayButton } from "../components/Button/RepayButton";
import { ApproveButton } from "../components/Button/ApproveButton";
import { useZkafiContractAddressHook } from "../hooks/useContractAddress.hook";

export default function DaiPage () {
  const [ creatingProof, setCreatingProof ] = useState(false)
  const zkafiAddress = useZkafiContractAddressHook()
  const { data } = useFeeData()
  async function proof (amount: number, merkle: any) {
    setCreatingProof(true)
    
    const result = await generateProof(amount, merkle)
      .then(async (zkProof) => {
        const config = await prepareWriteContract({
          address: zkafiAddress,
          abi: zkafiABI,
          functionName: 'noPermissionBorrow',
          args: [zkProof],
        })
        const data = await writeContract(config)
        return data
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        setCreatingProof(false)
      })
    console.log(result)
  }
  return (
      <Grid sx={{
        m: '8px',
      }} container rowSpacing={4}>
        <Grid container item rowSpacing={2}>
          <Grid item xs={12}>
            <BorrowForm 
              onSubmit={(e: {
                amount: number,
                merkle: string,
              }) => {
                proof(e.amount, e.merkle)
              }}
              loading={creatingProof}
            />
          </Grid>
        </Grid>
      </Grid>
  )
}

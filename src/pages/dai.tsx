import { Button, Card, CircularProgress, Grid } from "@mui/material";
import { generateProof } from "../services/proof.service";
import { BorrowForm } from "../components/Form/BorrowForm";
import { useState } from "react"
import { writeContract, prepareWriteContract } from '@wagmi/core'
import { useAccount, useFeeData } from "wagmi";
import { zkafiABI } from "../contracts/zkafi";
import { BigNumber } from "ethers";
import { zkafiAddress } from "../utils/contract-address";
import { RepayButton } from "../components/Button/RepayButton";
import { ApproveButton } from "../components/Button/ApproveButton";

export default function DaiPage () {
  const [ creatingProof, setCreatingProof ] = useState(false)
  const { data } = useFeeData()
  async function proof (amount: number, merkle: any) {
    setCreatingProof(true)
    
    const result = await generateProof(amount, merkle)
      .then(async (zkProof) => {
      //   const config = await prepareWriteContract({
      //     address: '0xfcC488090791F6944A44D74c36c2af37080dF727',
      //     abi: zkafiABI,
      //     functionName: 'noPermissionRepay',
      //     args: [100],
      //   })
      //   console.log(config)
      //   const data = await writeContract({
      //     ...config,

      //   })
      //   return data
      // })
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
          <Grid container item xs={12} justifyContent="center">
            <Grid item>
              <ApproveButton/>
            </Grid>
            <Grid item>
              <RepayButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  )
}

import { Button, Card, CircularProgress, Grid, Typography } from "@mui/material";
import { generateProof } from "../services/proof.service";
import { BorrowForm } from "../components/Form/BorrowForm";
import { useState } from "react"
import { writeContract, prepareWriteContract } from '@wagmi/core'
import { useAccount, useBalance, useContractRead, useFeeData, useToken } from "wagmi";
import { zkafiABI } from "../contracts/zkafi";
import { BigNumber } from "ethers";
import { RepayButton } from "../components/Button/RepayButton";
import { ApproveButton } from "../components/Button/ApproveButton";
import { useDaiContractAddressHook, useZkafiContractAddressHook } from "../hooks/useContractAddress.hook";
import { RepayForm } from "../components/Form/RepayForm";
import RepeatIcon from '@mui/icons-material/Repeat';
import { formatted, invokeFormat } from "../utils/ether-big-number";
import { DaiABI } from "../contracts/dai";
import { CurrentBalanceDisplay } from "../components/Display/CurrentBalanceDisplay";

export default function DaiPage () {
  const [ creatingProof, setCreatingProof ] = useState(false)
  const zkafiAddress = useZkafiContractAddressHook()
  async function proof (amount: number, merkle: any) {
    setCreatingProof(true)
    const result = await generateProof(invokeFormat(amount.toString()).toString(), merkle)
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
  }
  return (
      <Grid sx={{
        m: '8px',
      }} container rowSpacing={4}>
        <Grid 
          container 
          item 
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={5}>
            <Card sx={{
              p: 5,
              height: 400,
              backgroundColor: '#dcc5ad'
            }}>
              <BorrowForm 
                onSubmit={(e: {
                  amount: number,
                  merkle: string,
                }) => {
                  proof(e.amount, e.merkle)
                }}
                loading={creatingProof}
              />
            </Card>
          </Grid>
          <Grid 
            container
            item 
            xs={1}
            alignItems="center"
            justifyContent="center"
          >
            <RepeatIcon />
          </Grid>
          <Grid item xs={5}>
            <Card sx={{
              p: 5,
              height: 400,
              backgroundColor: '#dcc5ad'
            }}>
              <RepayForm 
                loading={creatingProof}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
  )
}

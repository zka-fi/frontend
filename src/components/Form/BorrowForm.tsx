import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { LoadingContent } from "../Loading/LoadingContent";
import { ApproveButton } from "../Button/ApproveButton";
import { erc20ABI, useAccount, useContractRead } from "wagmi";
import { useDaiContractAddressHook, useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook";
import { RepayButton } from "../Button/RepayButton";

export function BorrowForm ({ onSubmit, loading }: any) {
  const [amount, setAmount] = useState(0)
  const [merkle, setMerkle] = useState('')
  const { address } = useAccount()
  const daiAddress =  useDaiContractAddressHook()
  const zkafiAddress =  useZkafiContractAddressHook()
  const { data: daiToZkafiAllowance } = useContractRead({
    address: daiAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address!, zkafiAddress]
  })
  const { data: zkafiToDaiAllowance } = useContractRead({
    address: zkafiAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address!, daiAddress]
  })
  return (
    <Grid container rowSpacing={4} justifyContent="center">
      <Grid container item xs={7}>
        <TextField
          placeholder="Paste your Merkle Tree Proof there"
          multiline
          rows={10}
          style={{
            width: '100%'
          }}
          disabled={loading}
          onChange={(e) => {
            setMerkle(JSON.parse(e.target.value))
          }}
        />
      </Grid>
      <Grid container item xs={7}>
        <TextField 
          type="number"
          label="borrow amount"
          placeholder="enter amount"
          onChange={(e) => {
            setAmount(Number(e.target.value))
          }}
          disabled={loading}
          style={{
            width: '100%'
          }}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="center" columnSpacing={3}>
        <Grid item>
        <Button
              variant="contained"
              disabled={loading}
              onClick={() => {
                onSubmit({
                  amount,
                  merkle,
                })
              }}
            >
              {
              loading ? (
                <>
                  Borrowing...
                  <CircularProgress size={20} color="secondary"/>
                </> )
                : 'Borrow!'
            } 
            </Button>
        </Grid>
        <Grid item>
          {
            zkafiToDaiAllowance?.lte(0) ?
            <RepayButton />
            : <ApproveButton isApprove={zkafiToDaiAllowance?.lte(0)}/>
          }
        </Grid>
      </Grid>
    </Grid>
  )
}
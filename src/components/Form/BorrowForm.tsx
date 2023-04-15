import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { LoadingContent } from "../Loading/LoadingContent";
import { ApproveButton } from "../Button/ApproveButton";
import { erc20ABI, useAccount, useContractRead } from "wagmi";
import { useDaiContractAddressHook, useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook";
import { RepayButton } from "../Button/RepayButton";

export function BorrowForm ({ onSubmit, loading }: any) {
  const [amount, setAmount] = useState(0)
  const [repayAmount, setRepayAmount] = useState(0)
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
      <Grid container item xs={7} columnSpacing={2} alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={(e: any) => {
                if(!window.FileReader) return; // Browser is not compatible

                var reader = new FileReader();
            
                reader.onload = function(evt: any) {
                  if(evt.target.readyState != 2) return;
                  if(evt.target.error) {
                      alert('Error while reading file');
                      return
                  }
                  setMerkle(JSON.parse(evt.target.result))
                }
                reader.readAsText(e.target.files[0]);
              }}
            />
          </Button>
        </Grid>
        <Grid item>
          {
            merkle ? 'proof uploaded' : 'proof not uploaded'
          }
        </Grid>
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

      </Grid>
      <Grid container item xs={7} justifyContent="center" rowSpacing={4}>
        <Grid container item>
          <TextField 
            type="number"
            label="repay amount"
            placeholder="enter repay amount"
            onChange={(e) => {
              setRepayAmount(Number(e.target.value))
            }}
            disabled={loading}
            style={{
              width: '100%'
            }}
          />
        </Grid>
        <Grid container item xs={2}>
          <Grid item>
            {
              !daiToZkafiAllowance?.lte(0) ?
              <RepayButton amount={repayAmount}/>
              : <ApproveButton isApprove={!daiToZkafiAllowance?.lte(0)}/>
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
import { Button, FormControl, Grid, Input, OutlinedInput, TextField, alpha } from "@mui/material"
import { RepayButton } from "../Button/RepayButton"
import { ApproveButton } from "../Button/ApproveButton"
import { useState } from "react"
import { erc20ABI, useAccount, useContractRead } from "wagmi"
import { useDaiContractAddressHook, useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook"
import { DebtDisplay } from "../Display/DebtDisplay"
import { CurrentBalanceDisplay } from "../Display/CurrentBalanceDisplay"

export function RepayForm ({loading}:any) {
  const [repayAmount, setRepayAmount] = useState(0)
  const { address } = useAccount()
  const daiAddress =  useDaiContractAddressHook()
  const zkafiAddress =  useZkafiContractAddressHook()
  const { data: daiToZkafiAllowance } = useContractRead({
    address: daiAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address!, zkafiAddress]
  })
  return (
    <Grid container justifyContent="center" rowSpacing={4}>
      <Grid container item>
        <CurrentBalanceDisplay />
      </Grid>
      <Grid container item>
        <DebtDisplay/>
      </Grid>
      <Grid container item xs={12}>
        <FormControl fullWidth={true} variant="outlined">
          <Grid container item alignItems={'center'}>
            <Grid item xs={9}>
              <OutlinedInput 
                type="number"
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
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <Button 
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: '20px',
                }}
                style={{
                  color: alpha("#6C221C", 0.8),
                  borderColor: alpha("#6C221C", 0.8),
                  textTransform: 'none',
                }}
              >
                Max
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
      <Grid container item>
        {
          !daiToZkafiAllowance?.lte(0) ?
          (
            <>
              <RepayButton amount={repayAmount}/>
            </>
          )
          : <ApproveButton isApprove={!daiToZkafiAllowance?.lte(0)}/>
        }
      </Grid>
    </Grid>
  )
}
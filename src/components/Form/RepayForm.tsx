import { Box, Button, FormControl, Grid, Input, LinearProgress, OutlinedInput, Skeleton, TextField, alpha } from "@mui/material"
import { RepayButton } from "../Button/RepayButton"
import { ApproveButton } from "../Button/ApproveButton"
import { useEffect, useState } from "react"
import { erc20ABI, useAccount, useContractRead } from "wagmi"
import { readContract } from "@wagmi/core"
import { useDaiContractAddressHook, useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook"
import { DebtDisplay } from "../Display/DebtDisplay"
import { CurrentBalanceDisplay } from "../Display/CurrentBalanceDisplay"
import { useCurrentBalance } from "../../hooks/current-balance.hook"
import { BigNumber } from "ethers"
import { zkafiABI } from "../../contracts/zkafi"
import { formatted } from "../../utils/ether-big-number"

export function RepayForm ({
  loading,
  onStart,
  onComplete
}: any) {
  const [amount, setAmount] = useState<number>()
  const [transactionLoading, setTransactionLoading] = useState(false)
  const { address } = useAccount()
  const balance = useCurrentBalance()
  const daiAddress =  useDaiContractAddressHook()
  const zkafiAddress =  useZkafiContractAddressHook()
  const { data: daiToZkafiAllowance } = useContractRead({
    address: daiAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address!, zkafiAddress]
  })
  const { data: debtValue } = useContractRead({
    address: zkafiAddress,
    abi: zkafiABI,
    functionName: 'calculateRepayAmount',
    args: [address]
  })
  const debt = debtValue !== undefined ? formatted(debtValue).toString() : null
  return (
    <Grid container justifyContent="center" rowSpacing={4}>
      <Grid container item>
        <CurrentBalanceDisplay balance={balance} />
      </Grid>
      <Grid container item>
        {
          transactionLoading || loading ? 
          <Skeleton variant="rectangular" width={260} height={10} />
          : <DebtDisplay debt={debt}/>
        }
      </Grid>
      <Grid container item xs={12}>
        <FormControl fullWidth={true} variant="outlined">
          <Grid container item alignItems={'center'}>
            <Grid item xs={9}>
              <OutlinedInput 
                value={amount}
                placeholder="enter repay amount"
                type="number"
                onChange={(e) => {
                  setAmount(Number(e.target.value))
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
                onClick={() => {
                  setAmount(Number(debt))
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
              <RepayButton 
                amount={amount}
                onStart={() => {
                  setTransactionLoading(true)
                  onStart()
                }}
                onComplete={() => {
                  setTransactionLoading(false)
                  onComplete()
                }}
              />
            </>
          )
          : <ApproveButton isApprove={!daiToZkafiAllowance?.lte(0)}/>
        }
      </Grid>
    </Grid>
  )
}
import { useAccount, useContractRead, useToken } from "wagmi";
import { useDaiContractAddressHook } from "../../hooks/useContractAddress.hook";
import { DaiABI } from "../../contracts/dai";
import { Button, Grid, TextField, alpha } from "@mui/material";
import { useState } from "react";
import { formatted } from "../../utils/ether-big-number";

export function GetMaxBalanceDisplay() {
  const [amount, setAmount] = useState(0)
  const [submitAmount, setSubmitAmount] = useState(0)
  const { address } = useAccount()
  const daiAddress = useDaiContractAddressHook()
  const { data: balance } = useContractRead({
    address: daiAddress,
    abi: DaiABI,
    functionName: 'balanceOf',
    args: [address]
  })
  // return balance
  // return (
  //   <TextField 
  //     label="Amount"
  //     type="number"
  //     value={balance}
  //     sx={{
  //       ml: '0px',
  //       width: '100%'
  //     }}
  //   />
  // )
  return (
    <Grid container item alignItems={'center'} sx={{padding: '0 0 20px 0'}}>
      <Grid item xs={9}> 
        <TextField 
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value))
          }}
          sx={{
            ml: '0px',
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
          onClick={() => setAmount(Number(formatted(balance)))}
        >
          Max
        </Button>
      </Grid>
    </Grid>
  )
}

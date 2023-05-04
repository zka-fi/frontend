import { Button, Grid, TextField } from "@mui/material"
import { prepareWriteContract, writeContract} from '@wagmi/core'
import { zkafiABI } from "../contracts/zkafi"
import { useState } from "react"
import { BondCard } from "../components/Card/BondCard"
import { useDaiContractAddressHook } from "../hooks/useContractAddress.hook"

function Page () {
  return (
    <Grid sx={{
      m: 0,
    }} container rowSpacing={4}>
      <Grid container item justifyContent={'center'}>
        <BondCard />
      </Grid>
    </Grid>
  )
}

export default Page
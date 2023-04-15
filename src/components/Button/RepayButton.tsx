import { Button } from "@mui/material"
import { zkafiAddress } from "../../utils/contract-address"
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { zkafiABI } from "../../contracts/zkafi"
import { BigNumber } from "ethers"
import { useState } from "react"

export function RepayButton () {
  const [loading, setLoading] = useState(false)
  async function repay () {
    const config = await prepareWriteContract({
      address: zkafiAddress,
      abi: zkafiABI,
      functionName: 'noPermissionRepay',
      args: [BigNumber.from(20)],
    })
    await writeContract(config)
  }
  return (
    <Button 
      variant="contained" 
      color="success" 
      disabled={loading}
      onClick={()=> {
        setLoading(true)
        repay()
          .finally(() => {
            setLoading(false)
          })
      }}
    >
      Repay!
    </Button>
  )
}
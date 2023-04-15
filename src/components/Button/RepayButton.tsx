import { Button } from "@mui/material"
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { zkafiABI } from "../../contracts/zkafi"
import { BigNumber } from "ethers"
import { useState } from "react"
import { useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook"

export function RepayButton ({ amount }: any) {
  const [loading, setLoading] = useState(false)
  const zkafiAddress =  useZkafiContractAddressHook()
  async function repay () {
    const config = await prepareWriteContract({
      address: zkafiAddress,
      abi: zkafiABI,
      functionName: 'noPermissionRepay',
      args: [BigNumber.from(amount)],
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
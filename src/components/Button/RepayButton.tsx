import { Button } from "@mui/material"
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { zkafiABI } from "../../contracts/zkafi"
import { BigNumber } from "ethers"
import { useState } from "react"
import { useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook"
import { invokeFormat } from "../../utils/ether-big-number"

export function RepayButton ({ amount }: any) {
  const [loading, setLoading] = useState(false)
  const zkafiAddress =  useZkafiContractAddressHook()
  async function repay () {
    const config = await prepareWriteContract({
      address: zkafiAddress,
      abi: zkafiABI,
      functionName: 'noPermissionRepay',
      args: [invokeFormat(amount.toString())],
    })
    await writeContract(config)
  }
  return (
    <Button 
      variant="contained" 
      color="success" 
      disabled={loading}
      style={{
        textTransform: 'none',
      }}
      sx={{
        width: '120px',
      }}
      onClick={()=> {
        setLoading(true)
        repay()
          .finally(() => {
            setLoading(false)
          })
      }}
    >
      Repay
    </Button>
  )
}
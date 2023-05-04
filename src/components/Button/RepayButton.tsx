import { Button } from "@mui/material"
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import { zkafiABI } from "../../contracts/zkafi"
import { BigNumber } from "ethers"
import { useState } from "react"
import { useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook"
import { invokeFormat } from "../../utils/ether-big-number"
import { LoadingDialog } from "../Dialog/LoadingDialog"

export function RepayButton ({ 
  amount,
  onStart,
  onComplete,
}: any) {
  const [loading, setLoading] = useState(false)
  const zkafiAddress =  useZkafiContractAddressHook()
  async function repay () {
    try{
      const bigNumber = BigNumber.from(Math.ceil(Number(amount))).add(1).toString()
      const config = await prepareWriteContract({
        address: zkafiAddress,
        abi: zkafiABI,
        functionName: 'noPermissionRepay',
        args: [invokeFormat(bigNumber)],
      })
      const { hash } = await writeContract(config)
      
      await waitForTransaction({
        hash,
      })
    }catch (error){
      console.log(error)
    }
    onComplete()
  }
  return (
    <>
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
          onStart()
          repay()
            .finally(() => {
              setLoading(false)
            })
        }}
      >
        Repay
      </Button>
      <LoadingDialog open={loading}/>
    </>
  )
}
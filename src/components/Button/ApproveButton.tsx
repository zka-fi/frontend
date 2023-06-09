import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'
import { Button } from '@mui/material'
import { BigNumber } from 'ethers'
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { useDaiContractAddressHook, useZkafiContractAddressHook } from '../../hooks/useContractAddress.hook'

export function ApproveButton ({disabled, reverse, isApproved}: any) {
  const daiAddress =  useDaiContractAddressHook()
  const zkafiAddress =  useZkafiContractAddressHook()
  let addressFrom = daiAddress
  let addressTo = zkafiAddress
  if(reverse) {
    addressFrom = zkafiAddress
    addressTo = daiAddress
  }
  async function approve () {
    const config = await prepareWriteContract({
      address: addressFrom,
      abi: erc20ABI,
      functionName: 'approve',
      args: [addressTo, BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')],
    })
    await writeContract(config)
  }
  return (
    <>
      {
        <Button
          color="info"
          onClick={() => {
            if(!isApproved){
              approve()
            }
          }}
        >
            {
              isApproved ? 
              (
                <>
                  <CheckCircleOutlineIcon /> 
                  Approved
                </>
              )
              : 
              (
                <>
                  <ErrorOutlineIcon />
                  Not Approved
                </>
              )
            }
        </Button>
      }
      
    </>
  )
}
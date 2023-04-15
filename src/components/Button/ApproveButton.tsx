import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { daiAddress, zkafiAddress } from '../../utils/contract-address'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'
import { Button } from '@mui/material'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { prepareWriteContract, writeContract } from '@wagmi/core'

export function ApproveButton ({disabled, reverse}: any) {
  let addressFrom = daiAddress
  let addressTo = zkafiAddress
  if(reverse) {
    addressFrom = zkafiAddress
    addressTo = daiAddress
  }
  const { address } = useAccount()
  const { data } = useContractRead({
    address: addressFrom,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address!, addressTo]
  })
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
            if(data?.lte(0)){
              approve()
            }
          }}
        >
            {
              !data?.lte(0) ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />
            }
        </Button>
      }
      
    </>
  )
}
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'

import { Account } from '../components'
import { ConnectButton } from '../components/Button/ConnectButton'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

function Page() {
  const { isConnected } = useAccount()
  const router = useRouter()
  if(isConnected) router.push('/bond')
  return (
    <>
      {isConnected ? null : 'Please connect your wallet first!'}
    </>
  )
}

export default Page

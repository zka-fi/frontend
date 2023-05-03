import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'

import { Account } from '../components'
import { ConnectButton } from '../components/Button/ConnectButton'
import { Button } from '@mui/material'

function Page() {
  const { isConnected } = useAccount()
  return (
    <>
      {isConnected ? null : 'Please connect your wallet first!'}
    </>
  )
}

export default Page

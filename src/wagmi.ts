import { getDefaultClient } from 'connectkit'
import { configureChains, createClient, goerli } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

// TODO: fix
const { chains, provider, webSocketProvider } = configureChains(
  // TODO: pull flag from .env and reconfigure this config object
  [ goerli ],
  [
    publicProvider(),
  ],
)

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: 'Zk-fi',
    provider,
    webSocketProvider,
    chains,
  })
)

import { getDefaultClient } from 'connectkit'
import { Chain, configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import { goerli, polygonMumbai, celoAlfajores, gnosisChiado } from 'wagmi/chains'


export const makeChain = (name: string, rpc: string, id: number) => {
  return {
    id: id,
    name: name,
    network: name,
    nativeCurrency: {
      decimals: 18,
      name: name,
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: [rpc],
      },
      public: {
        http: [rpc],
      }
    },
    testnet: true,
  }
}
// const a = makeChain('Chiado Testnet', 'https://rpc.chiado.gnosis.gateway.fm', 10200)
const defaultChains: Chain[] = [
  polygonMumbai,
  goerli,
  gnosisChiado,
  celoAlfajores,
  makeChain('Mantle Testnet', 'https://rpc.testnet.mantle.xyz', 5001),
  makeChain('Scroll Alpha', 'https://alpha-rpc.scroll.io/l2', 534353),
  makeChain('Taiko Hackathon', 'https://l2rpc.hackathon.taiko.xyz', 167002),
];



const { chains, provider, webSocketProvider } = configureChains(
  // TODO: pull flag from .env and reconfigure this config object
  defaultChains,
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

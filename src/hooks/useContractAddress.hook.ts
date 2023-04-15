import { useNetwork } from "wagmi"
import { daiAddresses, zkafiAddresses } from "../utils/contract-address"

export function useDaiContractAddressHook () {
  const { chain } = useNetwork()
  // @ts-ignore
  return chain !== undefined ? daiAddresses[chain!.name]: ''
}

export function useZkafiContractAddressHook () {
  const { chain } = useNetwork()
  // @ts-ignore
  return chain !== undefined ? zkafiAddresses[chain!.name]: ''
}
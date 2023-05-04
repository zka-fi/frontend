import { useAccount, useContractRead } from "wagmi"
import { useDaiContractAddressHook } from "./useContractAddress.hook"
import { DaiABI } from "../contracts/dai"
import { formatted } from "../utils/ether-big-number"

export function useCurrentBalance () {
  const daiAddress = useDaiContractAddressHook()
  const { address } = useAccount()
  const { data: balance } = useContractRead({
    address: daiAddress,
    abi: DaiABI,
    functionName: 'balanceOf',
    args: [address]
  })
  return balance ? formatted(balance).toString() : null
}
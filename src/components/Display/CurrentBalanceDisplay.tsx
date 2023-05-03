import { Typography } from "@mui/material";
import { formatted } from "../../utils/ether-big-number";
import { useAccount, useContractRead, useToken } from "wagmi";
import { useDaiContractAddressHook } from "../../hooks/useContractAddress.hook";
import { DaiABI } from "../../contracts/dai";

export function CurrentBalanceDisplay ({ size = '18px' }: any) {
  const { address } = useAccount()
  const daiAddress = useDaiContractAddressHook()
  const { data: balance } = useContractRead({
    address: daiAddress,
    abi: DaiABI,
    functionName: 'balanceOf',
    args: [address]
  })
  const { data: token } = useToken({
    address: daiAddress,
  })
  return (
    <Typography
      sx={{
        fontWeight: 'bold',
        fontSize: size,
      }}
    >
      Balance: {balance ? formatted(balance).toString() : null} {token?.name}
    </Typography>
  )
}
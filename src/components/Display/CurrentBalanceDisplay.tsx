import { Typography } from "@mui/material";
import { formatted } from "../../utils/ether-big-number";
import { useAccount, useContractRead, useToken } from "wagmi";
import { useDaiContractAddressHook } from "../../hooks/useContractAddress.hook";
import { DaiABI } from "../../contracts/dai";

export function CurrentBalanceDisplay ({ 
  size = '18px',
  balance,
  isTokenDisplayed = true
}: any) {
  const daiAddress = useDaiContractAddressHook()
  const { data: token } = useToken({
    address: daiAddress,
  })
  return (
    <Typography
      sx={{
        fontWeight: 'normal',
        fontSize: size,
      }}
    >
      Balance: {balance} {isTokenDisplayed ? token?.name : null}
    </Typography>
  )
}
import { Typography } from "@mui/material";
import { formatted } from "../../utils/ether-big-number";
import { zkafiABI } from "../../contracts/zkafi";
import { useDaiContractAddressHook, useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook";
import { useContractRead } from "wagmi";
import { DaiABI } from "../../contracts/dai";


export function DAIPoolDisplay ({
  title = 'DAI Pool'
}: any) {
  const daiAddress = useDaiContractAddressHook()
  const zkafiAddress = useZkafiContractAddressHook()
  const { data: totalPool } = useContractRead({
    address: daiAddress,
    abi: DaiABI,
    functionName: 'balanceOf',
    args: [zkafiAddress]
  })
  return (
    <Typography
      sx={{
        fontSize: '18px',
        fontWeight: 'bold'
      }}
    >
      {title}: {totalPool ? formatted(totalPool).toString() : null} DAI
    </Typography>
  )
}
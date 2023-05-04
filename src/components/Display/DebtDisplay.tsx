import { useAccount, useContractRead } from "wagmi"
import { useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook"
import { zkafiABI } from "../../contracts/zkafi"
import { formatted } from "../../utils/ether-big-number"
import { Typography } from "@mui/material"

export function DebtDisplay ({
  onChange
}: any) {
  const { address } = useAccount()
  const zkafiAddress = useZkafiContractAddressHook()
  const { data: debt } = useContractRead({
    address: zkafiAddress,
    abi: zkafiABI,
    functionName: 'calculateRepayAmount',
    args: [address]
  })
  const value = debt !== undefined ? formatted(debt).toString() : null
  onChange(value)
  return (
    <Typography
      sx={{
        fontSize: '18px',
        fontWeight: 'bold'
      }}
    >
      current debt: {value}
    </Typography>
  )
}
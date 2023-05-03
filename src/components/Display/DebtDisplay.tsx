import { useAccount, useContractRead } from "wagmi"
import { useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook"
import { zkafiABI } from "../../contracts/zkafi"
import { formatted } from "../../utils/ether-big-number"
import { Typography } from "@mui/material"

export function DebtDisplay () {
  const { address } = useAccount()
  const zkafiAddress = useZkafiContractAddressHook()
  const { data: debt } = useContractRead({
    address: zkafiAddress,
    abi: zkafiABI,
    functionName: 'calculateRepayAmount',
    args: [address]
  })
  return (
    <Typography
      sx={{
        fontSize: '18px',
        fontWeight: 'bold'
      }}
    >
      current debt: {debt !== undefined ? formatted(debt).toString() : null}
    </Typography>
  )
}
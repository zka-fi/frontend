import { Typography } from "@mui/material"

export function DebtDisplay ({
  debt
}: any) {
  return (
    <Typography
      sx={{
        fontSize: '18px',
        fontWeight: 'bold'
      }}
    >
      current debt: {debt}
    </Typography>
  )
}
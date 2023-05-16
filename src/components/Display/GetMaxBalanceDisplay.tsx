import { Button, Grid, TextField, alpha } from "@mui/material";
import { useState } from "react";

export function GetMaxBalanceDisplay({
  balance,
  onChange
}: any) {
  const [amount, setAmount] = useState(0)

  return (
    <Grid container item justifyContent="space-between" alignItems='center' sx={{padding: '0 0 20px 0'}}>
      <Grid item xs={9}> 
        <TextField 
          placeholder="Amount"
          value={amount}
          type="number"
          onChange={(e) => {
            const value = e.target.value
            setAmount(Number(value))
            onChange(e)
          }}
          sx={{
            ml: '0px',
            width: '100%'
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button 
          variant="outlined"
          size="small"
          sx={{
            borderRadius: '20px',
          }}
          style={{
            color: alpha("#6C221C", 0.8),
            borderColor: alpha("#6C221C", 0.8),
            textTransform: 'none',
          }}
          onClick={() => setAmount(Number(balance))}
        >
          Max
        </Button>
      </Grid>
    </Grid>
  )
}

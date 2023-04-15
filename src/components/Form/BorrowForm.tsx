import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { LoadingContent } from "../Loading/LoadingContent";

export function BorrowForm ({ onSubmit, loading }: any) {
  const [amount, setAmount] = useState(0)
  const [merkle, setMerkle] = useState('')
  return (
    <Grid container rowSpacing={4} justifyContent="center">
      <Grid container item xs={7}>
        <TextField
          placeholder="Paste your Merkle Tree result here"
          multiline
          rows={10}
          style={{
            width: '100%'
          }}
          disabled={loading}
          onChange={(e) => setMerkle(e.target.value)}
        />
      </Grid>
      <Grid container item xs={7}>
        <TextField 
          type="number"
          label="borrow amount"
          placeholder="enter amount"
          onChange={(e) => {
            setAmount(Number(e.target.value))
          }}
          disabled={loading}
          style={{
            width: '100%'
          }}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            disabled={loading}
            onClick={() => {
              onSubmit({
                amount,
                merkle,
              })
            }}
          >
             {
            loading ? (
              <>
                generating proof
                <CircularProgress size={20} color="secondary"/>
              </> ): 'generate proof'
          }
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
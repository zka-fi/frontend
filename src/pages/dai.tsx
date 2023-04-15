import { Button, Card, CircularProgress, Grid } from "@mui/material";
import { generateProof } from "../services/proof.service";
import { BorrowForm } from "../components/Form/BorrowForm";
import { useState } from "react";

export default function DaiPage () {
  const [ creatingProof, setCreatingProof ] = useState(false)
  async function proof (amount: number) {
    setCreatingProof(true)
    const result = await generateProof(amount)
      .finally(() => {
        setCreatingProof(false)
      })
    console.log(result)
  }
  return (
      <Grid sx={{
        m: '8px',
      }} container rowSpacing={4}>
        <Grid container item>
          <Grid item xs={12}>
            <BorrowForm 
              onSubmit={(e: {
                amount: number,
                merkle: string,
              }) => {
                proof(e.amount)
              }}
              loading={creatingProof}
            />
          </Grid>
        </Grid>
      </Grid>
  )
}
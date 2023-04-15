import { Button, CircularProgress, Grid } from "@mui/material";
import { UploadMerkleArea } from "../components/Input/UploadMerkleArea";
import { createProof } from "../services/proof.service";
import { useState } from "react";

export default function MerkleTreePage () {
  const [ creatingProof, setCreatingProof ] = useState(false)
  async function proof () {
    setCreatingProof(true)
    const result = await createProof()
      .finally(() => {
        setCreatingProof(false)
      })
    console.log(result)
  }
  return (
    <Grid container rowSpacing={4}>
      <Grid container item>
        <Grid item xs={12}>
          <UploadMerkleArea/>
        </Grid>
      </Grid>
      <Grid 
        container 
        item 
        xs={12}
        justifyContent="center"
      >
        <Button
          color="primary"
          variant="contained"
          disabled={creatingProof}
          onClick={() => proof()}
        >
          generate proof
          {
            creatingProof ? <CircularProgress size={20} color="secondary"/> : null
          }
        </Button>
      </Grid>
    </Grid>
  )
}
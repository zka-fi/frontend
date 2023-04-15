import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { MerkleTreeArea } from "../Input/MerkleTreeArea";

export function ApplyForm () {
  const [merkleTree, setMerkleTree] = useState('')
  function updateClipboard(newClip: string) {
    navigator.clipboard.writeText(newClip).then(() => {
      /* clipboard successfully set */
    }, () => {
      /* clipboard write failed */
    });
  }
  return (
    <Grid container>
      <Grid item container justifyContent="center">
        <Button
          variant="contained"
          onClick={() => {
            setMerkleTree('a')
          }}
        >
         Apply Merkle Tree
        </Button>
      </Grid>
      {
        merkleTree ? 
          (
            <>
              {/* @ts-ignore */}
              <ASS/>
              <MerkleTreeArea value={merkleTree}/>
              <Button color="secondary" variant="contained" onClick={() => updateClipboard(merkleTree)}>copy</Button>
            </>
          )
          : null
      }
    </Grid>
  )
}
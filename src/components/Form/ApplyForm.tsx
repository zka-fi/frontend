import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MerkleTreeArea } from "../Input/MerkleTreeArea";
import { randomSleep } from "../../utils/dark-magic";

export function ApplyForm ({ proof, tree}: any) {
  const [isInit, setIsInit] = useState(false)
  const [merkleTree, setMerkleTree] = useState('')
  const [loading, setLoading] = useState(false)
  const [merkleTreeProof, setMerkleTreeProof] = useState('')
  function updateClipboard(newClip: string) {
    navigator.clipboard.writeText(newClip).then(() => {
      /* clipboard successfully set */
    }, () => {
      /* clipboard write failed */
    });
  }
  return (
    <Grid container rowSpacing={3}>
      <Grid item container justifyContent="center">
        <Button
          variant="contained"
          disabled={isInit}
          onClick={async () => {
            setLoading(true)
            setIsInit(true)
            await randomSleep(5000)
            setMerkleTree(JSON.stringify(tree, null, 2))
            setMerkleTreeProof(JSON.stringify(proof, null, 2))
            setLoading(false)
          }}
        >
          <Typography component="h3">
            Create Merkle Tree and Proof
          </Typography>
        </Button>
      </Grid>
      {
        isInit ? <Grid item container columnSpacing={4}>
          {
            loading ?
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
              :
              <>
                <Grid container item xs={6} rowSpacing={3}>
                  <Grid container item>
                    Merkle Tree
                    <MerkleTreeArea value={merkleTree}/>
                  </Grid>
                  <Grid container item justifyContent="center">
                    <Button color="secondary" variant="contained" onClick={() => updateClipboard(merkleTree)}>copy</Button>
                  </Grid>
                </Grid>
                <Grid container item xs={6} rowSpacing={3}>
                  <Grid container item>
                    Proof
                    <MerkleTreeArea value={merkleTreeProof}/>
                  </Grid>
                  <Grid container item justifyContent="center">
                    <Button color="secondary" variant="contained" onClick={() => updateClipboard(merkleTreeProof)}>copy</Button>
                  </Grid>
                </Grid>
              </>
          }
        </Grid> : null
      }
      
    </Grid>
  )
}
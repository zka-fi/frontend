import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MerkleTreeArea } from "../Input/MerkleTreeArea";
import { randomSleep } from "../../utils/dark-magic";
import { CredentialCard } from "../Card/CredentialCard";

export function ApplyForm ({ proof, tree}: any) {
  const [isInit, setIsInit] = useState(false)
  const [merkleTree, setMerkleTree] = useState('')
  const [loading, setLoading] = useState(false)
  const [merkleTreeProof, setMerkleTreeProof] = useState('')
  return (
    <Grid container rowSpacing={3}>
      <Grid item container justifyContent="center">
        {
          isInit ? null : 
          <Button
            variant="contained"
            disabled={isInit}
            onClick={async () => {
              setLoading(true)
              setIsInit(true)
              await randomSleep(3000)
              setMerkleTree(JSON.stringify(tree, null, 2))
              setMerkleTreeProof(JSON.stringify(proof, null, 2))
              setLoading(false)
            }}
          >
            <Typography component="h3">
              Create Merkle Tree and Proof
            </Typography>
          </Button>
        }
      </Grid>
      {
        isInit ? <Grid item container justifyContent="center" rowSpacing={4} columnSpacing={4}>
          {
            loading ?
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
              :
              <>
                <Grid container item xs={6} rowSpacing={3}>
                  <Grid item xs={12}>
                    <CredentialCard 
                      title={'Merkle Tree'}
                      tree={merkleTree}
                      proof={merkleTreeProof}
                      payload={tree.payload}
                    />
                  </Grid>
                </Grid>
              </>
          }
        </Grid> : null
      }
      
    </Grid>
  )
}
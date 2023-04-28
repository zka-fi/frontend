import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";
import { CredentialCard } from "../Card/CredentialCard";

export function ApplyForm () {
  const [isInit, setIsInit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [merkleTree, setMerkleTree] = useState({
    tree: {
      payload: {}
    },
    proof: {}
  })
  const callAPI = () => {
    setLoading(true)
    setIsInit(true)
    fetch('/api/merkle-tree')
      .then(res => {
        return res.json()
      })
      .then(res => {
        setMerkleTree(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Grid container rowSpacing={3} padding={3}>
      <Grid item container justifyContent="center">
        {
          isInit ? null : 
          <Button
            variant="contained"
            disabled={isInit}
            onClick={() => {
              callAPI()
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
                      tree={merkleTree.tree}
                      proof={merkleTree.proof}
                      payload={merkleTree.tree.payload}
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
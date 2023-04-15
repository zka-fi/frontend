import { Button, Grid } from "@mui/material";
import { UploadMerkleArea } from "../components/Input/UploadMerkleArea";

export default function MerkleTreePage () {
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
        >
          generate proof
        </Button>
      </Grid>
    </Grid>
  )
}
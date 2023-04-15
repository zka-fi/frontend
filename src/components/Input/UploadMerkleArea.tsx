import { TextField, Typography } from "@mui/material";

export function UploadMerkleArea () {
  return (
    <TextField
      placeholder="Paste your Merkle Tree result here"
      multiline
      rows={10}
      style={{
        width: '100%'
      }}
    />
  )
}
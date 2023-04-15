import { TextField, Typography } from "@mui/material";

export function UploadMerkleArea ({ onChange}: any) {
  return (
    <TextField
      placeholder="Paste your Merkle Tree result here"
      multiline
      rows={10}
      style={{
        width: '100%'
      }}
      onChange={(e) => onChange(e)}
    />
  )
}
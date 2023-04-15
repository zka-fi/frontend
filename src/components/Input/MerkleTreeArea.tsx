import { TextField, Typography } from "@mui/material";

export function MerkleTreeArea ({ onChange, value}: any) {
  return (
    <TextField
      multiline
      rows={10}
      style={{
        width: '100%'
      }}
      value={value}
      InputProps={{
        readOnly: true,
      }}
      onChange={(e) => onChange(e)}
    />
  )
}
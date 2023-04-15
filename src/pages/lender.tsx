import { Button, Grid, TextField } from "@mui/material"
import { prepareWriteContract, writeContract} from '@wagmi/core'
import { zkafiABI } from "../contracts/zkafi"
import { useState } from "react"
import { zkafiAddress } from "../utils/contract-address"

function Page () {
  const [amount, setAmount] = useState(0)
  const [writing, setWriting] = useState(false)
  async function bond () {
    setWriting(true)
    const config = await prepareWriteContract({
      address: zkafiAddress,
      abi: zkafiABI,
      functionName: 'bond',
      args: [amount],
    })
    const data = await writeContract(config)
    return data
  }
  return (
    <Grid sx={{
      m: 4,
    }} container rowSpacing={4}>
      <Grid container item xs={12} justifyContent="center">
        <TextField 
          label="Dai Amount"
          type="number"
          placeholder="How many dai will you provide"
          onChange={(e) => {
            setAmount(Number(e.target.value))
          }}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Button
          variant="contained"
          disabled={writing}
          onClick={() => 
            bond()
              .finally(() => {
                setWriting(false)
              })
          }
        >
          Bond!
        </Button>
      </Grid>
    </Grid>
  )
}

export default Page
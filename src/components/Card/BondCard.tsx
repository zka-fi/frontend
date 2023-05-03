import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { erc20ABI, useAccount, useBalance, useContractRead } from "wagmi";
import { useState } from "react";
import { prepareWriteContract, writeContract} from '@wagmi/core'
import { zkafiABI } from "../../contracts/zkafi";
import Image from "next/image";
import { useDaiContractAddressHook, useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook";
import { ApproveButton } from "../Button/ApproveButton";
import { BigNumber } from "ethers";
import { formatted, invokeFormat } from "../../utils/ether-big-number";
import { CurrentBalanceDisplay } from "../Display/CurrentBalanceDisplay";

export function BondCard () {
  const daiAddress = useDaiContractAddressHook()
  const { address } = useAccount()
  const zkafiAddress = useZkafiContractAddressHook()
  const [writing, setWriting] = useState(false)
  const [amount, setAmount] = useState(0)
  
  const { data: daiToZkafiAllowance } = useContractRead({
    address: daiAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address!, zkafiAddress]
  })
  async function bond () {
    setWriting(true)
    const config = await prepareWriteContract({
      address: zkafiAddress,
      abi: zkafiABI,
      functionName: 'bond',
      args: [invokeFormat(amount.toString()).toString()],
    })
    const data = await writeContract(config)
    return data
  }
  return (
    <Card sx={{
      p: 5,
      backgroundColor: '#dcc5ad'
    }}>
      <Card 
        sx={{
          p: 2,
          mb: 3
        }}
        style={{
          backgroundColor: '#daa608'
        }}
      >
        <Grid container rowSpacing={2}>
          <Grid item container justifyContent="space-between">
            <Grid item>
              <Typography sx={{
                fontSize: '24px'
              }}>
                Bonding Dai
              </Typography>
            </Grid>
            <Grid item>
              <CurrentBalanceDisplay />
            </Grid>
          </Grid>
          <Grid item container xs={10}>
            <Image src="/dai.png" width={56} height={56} alt="token"/>
            <TextField 
              label="Amount"
              type="number"
              placeholder="How many dai will you provide"
              onChange={(e) => {
                setAmount(Number(e.target.value))
              }}
              sx={{
                ml: '8px',
                width: '80%'
              }}
            />
          </Grid>
        </Grid>
      </Card>
      <Grid container item xs={12}>
        {
          !daiToZkafiAllowance?.lte(0) ?
          (<>
            <Button
                variant="contained"
                disabled={writing}
                style={{
                  width: '100%'
                }}
              onClick={() => 
                bond()
                  .finally(() => {
                    setWriting(false)
                  })
              }
            >
              Bond!
            </Button>
          </>)
          : <ApproveButton isApprove={!daiToZkafiAllowance?.lte(0)}/>
        }
      </Grid>
    </Card>
  )
}
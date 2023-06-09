import { Button, Card, CardContent, Grid, Skeleton, TextField, Typography, alpha } from "@mui/material";
import { erc20ABI, useAccount, useBalance, useContractRead } from "wagmi";
import { useState } from "react";
import { prepareWriteContract, writeContract, waitForTransaction} from '@wagmi/core'
import { zkafiABI } from "../../contracts/zkafi";
import Image from "next/image";
import { useDaiContractAddressHook, useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook";
import { ApproveButton } from "../Button/ApproveButton";
import { BigNumber } from "ethers";
import { formatted, invokeFormat } from "../../utils/ether-big-number";
import { CurrentBalanceDisplay } from "../Display/CurrentBalanceDisplay";
import { GetMaxBalanceDisplay } from "../Display/GetMaxBalanceDisplay";
import { useCurrentBalance } from "../../hooks/current-balance.hook";
import { DAIPoolDisplay } from "../Display/DAIPoolDisplay";
// import { ZDAIPoolDisplay } from "../Display/ZDAIPoolDisplay";

export function BondCard () {
  const daiAddress = useDaiContractAddressHook()
  const { address } = useAccount()
  const zkafiAddress = useZkafiContractAddressHook()
  const [writing, setWriting] = useState(false)
  const [amount, setAmount] = useState(0)
  const balance = useCurrentBalance()
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
    const {hash} = await writeContract(config)
    await waitForTransaction({hash})
  }
  return (
    <Card 
      sx={{
        p: 5,
        backgroundColor: alpha('#5B3700', 0.15),
        boxShadow: "0px 0px",
        width: '50%',
      }}
      style={{ borderRadius: "20px" }}
    >
      <Grid container rowSpacing={2} sx={{padding: '0 0 20px 0'}}>
        <Grid container item justifyContent='center'>
          <Grid item>
            {
              writing ?
              <Skeleton variant="rectangular" width={260} height={10}/>
              : (
                <>
                  {/* <ZDAIPoolDisplay/> */}
                  <DAIPoolDisplay/>
                </>
                )
            }
          </Grid>
        </Grid>
        <Grid item container alignItems={'center'} justifyContent="space-between">
          <div style={{ display: 'flex' }}>
            <Image src="/dai.png" width={30} height={30} style={{padding: '0 10px 0 0'}} alt="token"/>  
            <Typography display={'inline-block'} sx={{
              fontSize: '20px'
            }}>
              DAI
            </Typography>
          </div>
          <Grid item>
            <CurrentBalanceDisplay balance={balance} isTokenDisplayed={false}/>
          </Grid>
        </Grid>
      </Grid>
      <GetMaxBalanceDisplay 
        balance={balance}
        onChange={(e: any) => {
          setAmount(e.target.value)
        }}
      /> 
      <Grid container item xs={12}>
        {
          !daiToZkafiAllowance?.lte(0) ?
          (<>
            <Button
                variant="contained"
                disabled={writing}
                disableElevation
                style={{
                  width: '100%',
                  color: '#ffffff',
                  textTransform: 'none',
                }}
              onClick={() => 
                bond()
                  .finally(() => {
                    setWriting(false)
                  })
              }
            >
              Bond
            </Button>
          </>)
          : <ApproveButton isApprove={!daiToZkafiAllowance?.lte(0)}/>
        }
      </Grid>
    </Card>
  )
}
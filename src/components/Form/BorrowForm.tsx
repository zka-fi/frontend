import { Button, CircularProgress, Grid, TextField, alpha } from "@mui/material";
import { useState } from "react";
import { LoadingContent } from "../Loading/LoadingContent";
import { ApproveButton } from "../Button/ApproveButton";
import { erc20ABI, useAccount, useContractRead } from "wagmi";
import { useDaiContractAddressHook, useZkafiContractAddressHook } from "../../hooks/useContractAddress.hook";
import { RepayButton } from "../Button/RepayButton";
import { zkafiABI } from "../../contracts/zkafi";
import { BigNumber } from "ethers";
import { formatted } from "../../utils/ether-big-number";
import { TotalPoolDisplay } from "../Display/TotalPoolDisplay";
import { purple } from '@mui/material/colors';

export function BorrowForm ({ onSubmit, loading }: any) {
  const [amount, setAmount] = useState(0)
  const [merkle, setMerkle] = useState('')
  return (
    <Grid container rowSpacing={4} justifyContent="center">
      <Grid container item>
        <TotalPoolDisplay />
      </Grid>
      <Grid container item columnSpacing={2} alignItems="center">
        <Grid item>
          <Button
            variant="outlined"
            component="label"
            style={{
              color: alpha("#6C221C", 0.8),
              borderColor: alpha("#6C221C", 0.8),
              textTransform: 'none',
            }}
            sx={{
              width: '120px',
            }}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={(e: any) => {
                if(!window.FileReader) return; // Browser is not compatible

                var reader = new FileReader();
            
                reader.onload = function(evt: any) {
                  if(evt.target.readyState != 2) return;
                  if(evt.target.error) {
                      alert('Error while reading file');
                      return
                  }
                  setMerkle(JSON.parse(evt.target.result))
                }
                reader.readAsText(e.target.files[0]);
              }}
            />
          </Button>
        </Grid>
        <Grid item>
          {
            merkle ? 'proof uploaded' : 'proof not uploaded'
          }
        </Grid>
      </Grid>
      <Grid container item>
        <TextField 
          type="number"
          label="borrow amount"
          placeholder="enter amount"
          onChange={(e) => {
            setAmount(Number(e.target.value))
          }}
          disabled={loading}
          style={{
            width: '100%'
          }}
        />
      </Grid>
      <Grid container item xs={12} columnSpacing={3}>
        <Grid item>
          <Button
            variant="contained"
            disabled={loading}
            style={{
              backgroundColor: alpha("#6C221C", 0.8),
              textTransform: 'none',
            }}
            sx={{
              width: '120px',
            }}
            onClick={() => {
              onSubmit({
                amount,
                merkle,
              })
            }}
          >
            {
              loading ? (
                <>
                  Borrowing...
                  <CircularProgress size={20} sx={{ backgroundColor: alpha("#6C221C", 0.8)}}/>
                </> )
                : 'Borrow'
            } 
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
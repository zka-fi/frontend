import {
  Card,
  Grid,
  alpha,
} from "@mui/material";
import { BorrowForm } from "../components/Form/BorrowForm";
import { RepayForm } from "../components/Form/RepayForm";
import RepeatIcon from "@mui/icons-material/Repeat";
import { useState } from "react";

export default function DaiPage() {
  const [loading, setLoading] = useState(false)
  return (
    <Grid
      sx={{
        m: "8px",
      }}
      container
      rowSpacing={4}
    >
      <Grid container item alignItems="center" justifyContent="center">
        <Grid item xs={5}>
          <Card
            sx={{
              p: 5,
              height: 300,
              backgroundColor: alpha("#5B3700", 0.15),
            }}
            style={{ borderRadius: "20px" }}
          >
            <BorrowForm 
              loading={loading} 
              onStart={() => setLoading(true)}
              onComplete={() => setLoading(false)}
            />
          </Card>
        </Grid>
        <Grid container item xs={1} alignItems="center" justifyContent="center">
          <RepeatIcon className={loading ? 'spin--icon' : ''}/>
        </Grid>
        <Grid item xs={5}>
          <Card
            sx={{
              p: 5,
              height: 300,
              backgroundColor: alpha("#5B3700", 0.15),
            }}
            style={{ borderRadius: "20px" }}
          >
            <RepayForm 
              loading={loading} 
              onStart={() => setLoading(true)}
              onComplete={() => setLoading(false)}
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

function ContentText ({ children }: any) {
  return (
    <Typography component="h4">
      {children}
    </Typography>
  )
}

export function CredentialCard ({
  payload,
  tree,
  proof,
}: any) {
  function downloadCert (value: string, fileName: string) {
    const link = document.createElement('a');
    link.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(value)}`)
    link.setAttribute(
      'download',
      `${fileName}.json`,
    );
    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();
    // Clean up and remove the link
    link?.parentNode?.removeChild(link);
  }
  return (
    <Card>
      <CardContent>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
            Credential Info
        </Typography>
        <Box>
          <ContentText>address : {payload?.address}</ContentText>
          <ContentText>issuer : {payload?.issuer}</ContentText>
          <ContentText>expired at : {new Date(payload?.expired).toISOString()}</ContentText>
          <ContentText>credential amount : {payload?.value}</ContentText>
          <ContentText>is revoke : {payload?.revoke ? 'true' : 'false'}</ContentText>
        </Box>
        <Grid container justifyContent="end" columnSpacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => downloadCert(tree, 'tree')}
            >
              Download Tree
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => downloadCert(proof, 'proof')}
            >
              Download Proof
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
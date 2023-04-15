import { ConnectKitProvider } from 'connectkit'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'

import '../styles/global.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { client } from '../wagmi'
import { AppBar, Container } from '@mui/material'
import { ApplicationBar } from '../components/Bar/AppBar'
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[900],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#ef5350',
    },
  },
});


function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig client={client}>
      <ThemeProvider theme={theme}>
      <ConnectKitProvider>
        <NextHead>
          <title>Zk-fi</title>
        </NextHead>
        <ApplicationBar />
        <Container>
          {mounted && <Component {...pageProps} />}
        </Container>
      </ConnectKitProvider>
      </ThemeProvider>
    </WagmiConfig>
  )
}


export default App

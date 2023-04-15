import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ConnectButton } from '../Button/ConnectButton';
import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import { ApproveButton } from '../Button/ApproveButton';
import { useAccount } from 'wagmi';
import Image from "next/image";

const pages = [
  {
    label: 'Dai',
    link: '/dai',
  },
  {
    label: 'Bank',
    link: '/merkle-tree'
  },
  {
    label: 'lender',
    link: '/lender'
  },
]


export function ApplicationBar() {
  const { isConnected } = useAccount()
  const [value, setValue] = React.useState(0)
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  function redirect (e:  React.SyntheticEvent, link: string) {
    e.preventDefault()
    router.push(link)
  }
  return (
    <AppBar position="static" style={{
      backgroundColor: '#FFFFFF'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image 
            src="/ZKAFI-LOGO-16-9.png"
            alt="logo"
            width={160}
            height={90}
            onClick={(e) => redirect(e, '/')}
          />

          <Box sx={{ flexGrow: 1}}>
            <Tabs value={value} onChange={handleChange} centered>
              {pages.map((page) => (
                <Tab
                  component="a"
                  key={page.label}
                  label={page.label}
                  href={page.link}
                  onClick={(e: any) => redirect(e, page.link)}
                />
              ))}
            </Tabs>
            
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
              <ConnectButton />
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
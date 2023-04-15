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

const pages = [
  {
    label: 'Dai',
    link: '/dai',
  },
  {
    label: 'Merkle Tree',
    link: '/merkle-tree'
  },
]


export function ApplicationBar() {
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={(e) => redirect(e, '/')}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1}}>
            <Tabs value={0} onChange={handleChange} centered>
              {pages.map((page) => (
                <Tab
                  component="a"
                  key={page.label}
                  label={page.label}
                  href={page.link}
                  style={{
                    color: 'white'
                  }}
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
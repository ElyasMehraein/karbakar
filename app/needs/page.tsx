import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

import GetBusinessesDemands from '@/components/templates/index/SecondTab/GetBusinessesDemands';

export default function Page(): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Button size="large" edge="start" color="inherit" aria-label="menu">
              <ArrowForwardIcon />
              <Typography sx={{ mx: 1 }} component="div">
                بازگشت
              </Typography>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Box sx={{ my: 3 }}>
        <GetBusinessesDemands />
      </Box>
    </Box>
  );
}

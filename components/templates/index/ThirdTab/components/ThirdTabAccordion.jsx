import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from '@mui/material';
import ThirdTabjoinAUnion from './joinAUnion';

export default function ThirdTabAccordion({ union, accordionDetails, primeBusiness, user }) {
  const userIsABusinessAgent = user?.businesses?.some(business => Number(business.agentCode) === Number(user.code));

  const [open, setOpen] = useState(false);
  const handleMembership = () => {
    setOpen(true);
  };
  const dialogCloseHandler = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <ThirdTabjoinAUnion  {...{ primeBusiness, user, union, open, dialogCloseHandler }} />
      <Accordion
        disableGutters
        sx={{ bgcolor: blue[50], my: 1, minWidth: 300, width: '100%' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ alignSelf: 'flex-start' }} />}
          aria-controls="pane-content"
          id="pane-header"
        // sx={{
        //   display: 'flex',
        //   flexDirection: 'row',
        //   justifyContent: 'space-between',
        //   // alignItems: 'flex-start',
        //   // pl: 1,
        //   // minHeight: 56,
        //   position: 'relative',
        // }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{ fontSize: 12, m: 0, fontWeight: 'bold' }}
              textAlign="right"
            >
              {union.unionName}
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
              align="justify"
              dir="rtl"
            >
              {union.slogan}
            </Typography>
          </Box>
        </AccordionSummary>

        {accordionDetails(union)}

        <AccordionActions>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography sx={{ mr: 1, fontSize: '12px' }}>
              {`مدت اتحاد: ${union.deadline} روز`}
            </Typography>
            {userIsABusinessAgent &&
              <Button variant="contained" color="primary" onClick={handleMembership}>
                عضویت
              </Button>
            }
          </Box>
        </AccordionActions>
      </Accordion>
    </React.Fragment>
  );
}

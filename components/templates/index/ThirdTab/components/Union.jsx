import React, { useState } from 'react'
import Typography from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import Box from "@mui/material/Box";
import { Button } from '@mui/material';
import UnionsAccordionDetails from './UnionsAccordionDetails';
import JoinAUnion from './JoinAUnion';

export default function Union({ primeBusiness, user, union, category }) {
  const userIsABusinessAgent = user?.businesses?.some(business => Number(business.agentCode) === Number(user.code));

  const [open, setOpen] = useState(false);

  const handleMembership = () => {
    setOpen(true);
  };

  const dialogCloseHandler = () => {
    setOpen(false);
  };

  const categoryText = {
    category1: "اتحاد هایی که به محصولات کسب و کارهای شما نیاز دارند",
    category2: "اتحادهایی که شما عضو هستید اما هنوز نیازها و پیشنهادهای آن کامل نشده است",
    category3: "اتحادهای شما که نیازها و پیشنهادهای آن کامل شده و اعضا باید یکدیگر را تایید نمایند",
    category4: "اتحاد های فعال شما",
    category5: "سایر اتحادها",
  };
  return (
    <React.Fragment>
      <Typography fontSize={14} py={1} >{categoryText[category]}</Typography>
      <JoinAUnion  {...{ primeBusiness, user, union, open, dialogCloseHandler }} />
      <Accordion
        disableGutters
        sx={{ bgcolor: blue[50], my: 1, minWidth: 300, width: '100%' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ alignSelf: 'flex-start' }} />}
          aria-controls="pane-content"
          id="pane-header"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'flex-start',
            // pl: 1,
            // minHeight: 56,
            position: 'relative',
          }}
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
        <UnionsAccordionDetails union={union} user={user} />
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
            {userIsABusinessAgent && category == "category1" ?
              <Button variant="contained" color="primary" onClick={handleMembership}>
                عضویت
              </Button>
              :
              <Button variant="contained" color="secondary" onClick={handleMembership}>
                صفحه تایید متحدان
              </Button>
            }
          </Box>
        </AccordionActions>
      </Accordion>
    </React.Fragment>
  )
}

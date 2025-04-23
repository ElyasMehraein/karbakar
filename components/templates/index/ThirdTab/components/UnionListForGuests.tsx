import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import React, { useState } from 'react';

import UnionsAccordionDetails from './UnionsAccordionDetails';

interface Union {
  unionName: string;
  slogan: string;
  deadline: number;
  members?: any[];
  isActive: boolean;
}

interface UnionListForGuestsProps {
  union: Union;
  user: any;
}

export default function UnionListForGuests({
  union,
  user,
}: UnionListForGuestsProps) {
  const [votePageOpen, setVotePageOpen] = useState(false);

  const unionVotePage = () => {
    setVotePageOpen(true);
  };

  return (
    <React.Fragment>
      <Typography className="inMiddle" fontSize={14} py={1}>
        تمام اتحادها
      </Typography>
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
            {(union.members?.length ?? 0) > 1 && !union.isActive && (
              <Button
                variant="contained"
                color="secondary"
                onClick={unionVotePage}
              >
                صفحه تایید متحدان
              </Button>
            )}
          </Box>
        </AccordionActions>
      </Accordion>
    </React.Fragment>
  );
}

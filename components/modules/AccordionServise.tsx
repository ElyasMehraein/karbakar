'use client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import React from 'react';

import { Business } from '@/types';

interface AccordionServiseProps {
  business: Business;
}

export default function AccordionServise({ business }: AccordionServiseProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{business.businessName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {business.bio}
          </Typography>
          {business.phone && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              📞 {business.phone}
            </Typography>
          )}
          {business.email && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              📧 {business.email}
            </Typography>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

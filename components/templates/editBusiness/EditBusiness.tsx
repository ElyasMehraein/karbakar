"use client"
import React from 'react';
import { Box, Container } from '@mui/material';
import { Business } from '@/types';
import NameEdit from '@/components/modules/NameEdit';
import BioEdit from '@/components/modules/BioEdit';
import PhoneEdit from '@/components/modules/PhoneEdit';
import EmailEdit from '@/components/modules/EmailEdit';
import AddressEdit from '@/components/modules/AddressEdit';
import ExplainEdit from '@/components/modules/ExplainEdit';
import SocialMediaEdit from '@/components/modules/SocialMediaEdit';
import CustomSnackbar from '@/components/modules/CustomSnackbar';

interface EditBusinessProps {
  business: Business;
}

export default function EditBusiness({ business }: EditBusinessProps) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  const handleMaxLengthError = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <NameEdit
          business={business}
          label="نام کسب و کار"
          maxLengthError={handleMaxLengthError}
        />
        <BioEdit
          business={business}
          maxLengthError={handleMaxLengthError}
        />
        <PhoneEdit
          business={business}
          maxLengthError={handleMaxLengthError}
        />
        <EmailEdit
          business={business}
          maxLengthError={handleMaxLengthError}
        />
        <AddressEdit
          business={business}
          maxLengthError={handleMaxLengthError}
        />
        <ExplainEdit
          business={business}
          maxLengthError={handleMaxLengthError}
        />
        <SocialMediaEdit
          business={business}
          maxLengthError={handleMaxLengthError}
        />
      </Box>
      <CustomSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
} 
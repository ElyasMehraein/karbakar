'use client';
import Button from '@mui/material/Button';
import React from 'react';

import { triggerSnackbar } from '@/utils/snackbarService';

const ExampleComponent: React.FC = () => {
  return (
    <div>
      <Button
        onClick={() => triggerSnackbar(' موفقیت‌آمیز   ', 'error')}
        variant="contained"
        color="primary"
      >
        نمایش اسنک‌ بار
      </Button>
    </div>
  );
};

export default ExampleComponent;

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function TableSegment() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton size="small" value="از ابتدای تاسیس">از ابتدای تاسیس</ToggleButton>
      <ToggleButton size="small" value="یکسال گذشته">یکسال گذشته</ToggleButton>
      <ToggleButton size="small" value="یکماه گذشته">یکماه گذشته</ToggleButton>
      <ToggleButton size="small" value="جدیدترین">جدیدترین</ToggleButton>
    </ToggleButtonGroup>
  );
}

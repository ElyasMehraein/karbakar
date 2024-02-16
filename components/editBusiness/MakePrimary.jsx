import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Container, Typography } from '@mui/material';

export default function ControlledCheckbox() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Container maxWidth="md">
            <Typography>انتخاب بعنوان کسب و کار اصلی</Typography>
            <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </Container>
    );
}

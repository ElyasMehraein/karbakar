import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Box, Container, Typography } from '@mui/material';
import {createBusiness_selectAsPrimary} from "@/components/typoRepo"


export default function ControlledCheckbox() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Container maxWidth="md">
            <Box display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                >

                <Typography>انتخاب بعنوان کسب و کار اصلی</Typography>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Box>
            {createBusiness_selectAsPrimary()}

        </Container>
    );
}

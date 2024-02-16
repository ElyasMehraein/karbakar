import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { selectGuild } from '../typoRepo';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container, Typography } from '@mui/material';

export default function SelectLabels() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <Container maxWidth="md">
                <Typography sx={{my:2}}>{selectGuild}</Typography>
                <FormControl sx={{minWidth: 300 }}>
                    <InputLabel>انتخاب صنف</InputLabel>
                    <Select
                        value={age}
                        label="انتخاب صنف"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>نجاری</MenuItem>
                        <MenuItem value={20}>مکانیکی</MenuItem>
                        <MenuItem value={30}>کشاورزی</MenuItem>
                    </Select>
                </FormControl>

            </Container>
        </div>
    );
}

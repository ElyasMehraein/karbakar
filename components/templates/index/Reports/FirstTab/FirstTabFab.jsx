import React, { useState } from 'react'
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Autocomplete, Container, TextField, Typography } from '@mui/material';
import Guild from "@/components/modules/Guild"
import Map from './Map';

export default function FirstTabFab() {
    function handleDelete() {

    }

    return (
        <Container maxWidth="md">

            <Box >
                <Chip sx={{ m: 0.5, direction: 'ltr' }} label="ذوب آهن" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="بقالی" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="تولید فولاد سرد و گرم و خشک و مرطوب" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="zsvdfdsfdsdv" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="zsdsfsdfassdczsvdsdv" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="aa" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="ssdd" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="aa" variant="outlined" onDelete={handleDelete} />
                <Chip sx={{ direction: 'ltr' }} label="zsdsfsdfassdczsvdsdv" variant="outlined" onDelete={handleDelete} />

            </Box>
            <Autocomplete
                disablePortal
                options={["test1", "test2"]}
                sx={{ width: 300, my: 1 }}
                renderInput={(params) => <TextField {...params} label="به محصولات چه صنفی نیاز دارید" />}
            />
            <Typography sx={{ textAlign: "center", fontSize: 14 }}>دوست دارید تامین‌کننده‌های شما به کدام نقطه از نقشه نزدیک‌تر باشند؟</Typography>
            <Map></Map>
            <TextField
                  id="requestText"
                  label="شرح درخواست خود را وارد نمایید(غیر الزامی)"
                  multiline
                  rows={4}
                  placeholder="مثلا تولید کننده تجهیزات کشاورزی هستم و به انواع وروق و پروفیل آهن نیاز دارم"
                  fullWidth
                  size="small"
                  onChange={(e) => setMessage(e.target.value)}

                />
        </Container>
    )
}

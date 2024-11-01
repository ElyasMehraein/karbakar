import React, { useState } from 'react'
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Autocomplete, Button, Container, TextField, Typography } from '@mui/material';
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/templates/index/FirstTab/Map"), { ssr: false })

export default function FirstTabFab({user}) {

    function handleDelete() {

    }

    return (
        <Container maxWidth="md"  className="inMiddle" display="flex"  align='center'>

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
            <Typography sx={{m:2, textAlign: "center", fontSize: 14 }}>دوست دارید تامین‌کننده‌های شما به کدام نقطه از نقشه نزدیک‌تر باشند؟</Typography>
            <Map business={user.businesses[0]} ></Map>
            <TextField
                id="requestText"
                label="شرح درخواست خود را وارد نمایید(غیر الزامی)"
                multiline
                rows={4}
                placeholder="مثلا تولید کننده تجهیزات کشاورزی هستم و به انواع ورق و پروفیل آهن نیاز دارم"
                fullWidth
                size="small"
                onChange={(e) => setMessage(e.target.value)}
                sx={{ mt: 2 }}
            />
            <Button
               
                sx={{ mt: 2 }}
                children={"ثبت درخواست"}
                variant="contained"
            // disabled={selectedProduct && unitOfMeasurement && amount ? false : true}
            // onClick={addToBills}
            />
        </Container>
    )
}

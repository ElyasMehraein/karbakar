"use client"
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import MyAppBar from '../common/MyAppBar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Guild from "@/components/common/Guild"

export default function createBusiness() {
    const router = useRouter()
    const [businessName, setBusinessName] = useState("")
    const [guildname, setGuildName] = useState("")
    const updateGuildname = (newGuildname) => {
        setGuildName(newGuildname);
    };

    async function createThisBusiness(businessName) {
        const res = await fetch('api/signbusiness', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessName, guildname })
        })
        console.log("response to sending sms is =>", res);
        if (res.status === 406) {
            phoneError()
        } else if (res.status === 201) {
            router.push('/')
        }
    }
    return (
        <>
            <MyAppBar business={null} logedUserCode={null} whichUserProfile={null} />
            <Container maxWidth="md">
                <Box className='inMiddle'
                    sx={{
                        '& .MuiTextField-root': { width: '30ch' },
                        my: 3
                    }}
                    display="flex" flexDirection="column">
                    <Typography >یک نام برای کسب و کار خودانتخاب کنید</Typography>
                    <TextField
                        sx={{ my: 3 }}
                        placeholder='حداکثر 30 کارکتر' variant="outlined"
                        label="نام کسب و کار"
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                    <Guild updateGuildname={updateGuildname} />
                    <Button onClick={() => createThisBusiness(businessName)} variant="contained">
                        ایجاد کسب و کار
                    </Button>
                </Box>
            </Container>
        </>
    )

}

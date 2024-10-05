import { Avatar, AvatarGroup, Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import ItsAvatar from './ItsAvatar'

export default function ReceiversAndProviders() {
    return (
        <Container
            sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}
        >
            <Box sx={{
                display: "flex", flexDirection: { xs: "column", md: "row" },
                minWidth: { xs: 280, sm: 500, md:900 },
            }} >
                <Button fullWidth sx={{ m: 1 }} dir="ltr" variant="outlined">
                    <AvatarGroup max={4}>
                        <Avatar>
                            <ItsAvatar userCodeOrBusinessBrand={"nikkala"} isAvatar={true} alt="none" />
                        </Avatar>
                        <Avatar>

                            <ItsAvatar userCodeOrBusinessBrand={"sobhanmine"} isAvatar={true} alt="none" />
                        </Avatar>
                        <Avatar>

                            <ItsAvatar userCodeOrBusinessBrand={"modelpelast"} isAvatar={true} alt="none" />
                        </Avatar>
                        <Avatar>

                            <ItsAvatar userCodeOrBusinessBrand={"shahramfarm"} isAvatar={true} alt="none" />
                        </Avatar>

                    </AvatarGroup>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography color="NavyDarkSlateGray" variant="button" >
                        دریافت کنندگان
                    </Typography>
                </Button>
                <Button fullWidth sx={{ m: 1 }} dir="ltr" variant="outlined">
                    <AvatarGroup max={4}>
                        <Avatar>
                            <ItsAvatar userCodeOrBusinessBrand={"nikkala"} isAvatar={true} alt="none" />
                        </Avatar>
                        <Avatar>

                            <ItsAvatar userCodeOrBusinessBrand={"sobhanmine"} isAvatar={true} alt="none" />
                        </Avatar>
                        <Avatar>

                            <ItsAvatar userCodeOrBusinessBrand={"modelpelast"} isAvatar={true} alt="none" />
                        </Avatar>
                        <Avatar>

                            <ItsAvatar userCodeOrBusinessBrand={"shahramfarm"} isAvatar={true} alt="none" />
                        </Avatar>

                    </AvatarGroup>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography color="NavyDarkSlateGray" variant="button" >
                        تامین کنندگان
                    </Typography>
                </Button>
                <Button fullWidth sx={{ m: 1 }} dir="ltr" variant="contained">
                عضویت در لیست تامین کنندگان
                </Button>
            </Box>
        </Container>
    )
}

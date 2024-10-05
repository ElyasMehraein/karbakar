import { Avatar, AvatarGroup, Box, Typography } from '@mui/material'
import React from 'react'
import ItsAvatar from './ItsAvatar'

export default function Receivers() {
    return (
        <Box
        dir="ltr"
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <AvatarGroup dir="ltr" max={4}>
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
        </Box>
    )
}

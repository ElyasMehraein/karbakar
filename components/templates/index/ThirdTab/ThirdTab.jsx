import React from 'react'
import ThirdTabFrame from './ThirdTabActiveUnion'
import { AvatarGroup, Container, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ItsAvatar from '@/components/modules/ItsAvatar';
import ThirdTabWaitForOthersToAccept from './ThirdTabWaitForOthersToAccept';
import ThirdTabActiveUnion from './ThirdTabActiveUnion';
import ThirdTabWaitForYouToAccept from './ThirdTabWaitForYouToAccept';
import { blue } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import ThirdTabUnionWaitForComplete from './ThirdTabUnionWaitForComplete';
import ThirdTabUnionsWhichNeedYourProducts from './ThirdTabUnionsWhichNeedYourProducts';

export default function ThirdTab() {


    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
            <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>
                اتحاد های فعال شما
            </Typography>
            <ThirdTabActiveUnion />
            <ThirdTabActiveUnion />
            <ThirdTabActiveUnion />
            <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>
                اتحاد های منتظر تایید سایر اعضا
            </Typography>
            <ThirdTabWaitForOthersToAccept />
            <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>
                اتحاد های منتظر تایید شما
            </Typography>
            <ThirdTabWaitForYouToAccept />
            <Box sx={{ my: 2, p: 2, borderRadius: 2 }} bgcolor={grey[300]}>
                <Box>
                    اتحاد های منتظر تکمیل
                </Box>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
                    <Typography>درخواست دیگران از شما</Typography>
                    <Typography>درخواست شما از دیگران</Typography>
                </Box>
            </Box>
            <ThirdTabUnionWaitForComplete />
            <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>
                اتحادهایی که به محصولات شما نیاز دارند
            </Typography>
            <ThirdTabUnionsWhichNeedYourProducts/>
        </Container>
    )
}

import React, { useEffect, useState } from 'react'
import ThirdTabFrame from './union/ActiveUnion'
import { AvatarGroup, Container, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ItsAvatar from '@/components/modules/ItsAvatar';
import WaitForOthersToAccept from './union/WaitForOthersToAccept';
import ActiveUnion from './union/ActiveUnion';
import WaitForYouToAccept from './union/WaitForYouToAccept';
import { blue } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import UnionWaitForComplete from './union/UnionWaitForComplete';
import UnionsWhichNeedYourProducts from './union/UnionsWhichNeedYourProducts';
import OtherUnions from './union/OtherUnions';
import ThirdTabAccordion from './components/ThirdTabAccordion';

export default function ThirdTab({ primeBusiness, user }) {

    // اتحاد هایی که به محصولات کسب و کارهای شما نیاز دارند
    // اتحادهایی که شما عضو شدید اما پیشنهادها و نیازهای باقی مانده دارد
    // اتحادهای شما که نیازها و پیشنهادهای آن کامل شده و اعضا باید یکدیگر را تایید نمایند
    // اتحاد های فعال شما

    const [unions, setUnions] = useState([]);
    console.log("unions", unions);

    useEffect(() => {
        const getUnions = async () => {
            try {
                const res = await fetch("/api/getUnions", { method: "GET" });
                if (res.status === 200) {
                    const { data } = await res.json();
                    setUnions(data)
                } else if (res.status === 403) {
                    console.log("unauthorized access");
                }
            } catch (error) {
                console.error("Error fetching Unions:", error);
            }
        };
        getUnions();
    }, []);

    return (
        <Container sx={{ mb: 10 }} maxWidth="md" className="inMiddle" display="flex" align='center'>
            {/* <Typography sx={{ m: 2, textAlign: "center", fontSize: 14 }}>
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
            {/* <ThirdTabUnionsWhichNeedYourProducts />
            <UnionsWhichNeedYourProducts {...{ primeBusiness, user, unions }} />
            */}
            {unions.category1?.length ?
                <UnionsWhichNeedYourProducts {...{ primeBusiness, user, unions:unions.category1}} /> : null
            }
        </Container>
    )
}

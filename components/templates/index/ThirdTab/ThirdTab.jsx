import React, { useEffect, useState } from 'react'
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
import ThirdTabOtherUnions from './ThirdTabOtherUnions';

export default function ThirdTab({ primeBusiness, user }) {

    // - تمام اتحادهای دیگر
    //   - اتحاد هایی که به محصولات کسب و کارهای شما نیاز دارند
    //   - اتحادهای منتظر تکمیل توسط شما
    //   - اتحادهای منتظر تکمیل توسط سایر اعضا
    //   - اتحادهای تکمیل شده منتظر تایید
    //   - اتحاد های فعال شما
    const [unions, setUnions] = useState([]);
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
            <ThirdTabUnionsWhichNeedYourProducts /> */}
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                سایر اتحادها
            </Typography>
            {unions.map((union) => {
                return <ThirdTabOtherUnions {...{ primeBusiness, user }} union={union} key={union._id} />
            })}
        </Container>
    )
}

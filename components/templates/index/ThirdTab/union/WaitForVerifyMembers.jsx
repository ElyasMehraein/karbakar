import React from 'react'
import Typography from "@mui/material/Typography";
import ThirdTabAccordion from '../components/ThirdTabAccordion';
import OtherUnionsAccordionDetails from '../components/OtherUnionsAccordionDetails';

export default function WaitForVerifyMembers({ primeBusiness, user, unions }) {

    return (
        <React.Fragment>
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                اتحادهای شما که نیازها و پیشنهادهای آن کامل شده و اعضا باید یکدیگر را تایید نمایند
            </Typography>
            {unions.map((union) => {
                return <ThirdTabAccordion {...{ primeBusiness, user, union }} accordionDetails={OtherUnionsAccordionDetails} key={union._id} />
            })}
        </React.Fragment>

    )
}
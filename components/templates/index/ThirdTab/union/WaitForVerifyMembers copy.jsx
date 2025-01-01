import React from 'react'
import Typography from "@mui/material/Typography";
import OtherUnionsAccordionDetails from '../components/OtherUnionsAccordionDetails';
import AccordionForVote from '../WaitForVerifyMembers/WaitForVerifyMembersAccordion';

export default function WaitForVerifyMembers({ primeBusiness, user, unions }) {

    return (
        <React.Fragment>
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                اتحادهایی که شما عضو هستید و نیازها و پیشنهادهای آن کامل شده و اعضا باید یکدیگر را تایید نمایند
            </Typography>
            {unions.map((union) => {
                return <AccordionForVote {...{ primeBusiness, user, union }} accordionDetails={OtherUnionsAccordionDetails} key={union._id} />
            })}
        </React.Fragment>

    )
}
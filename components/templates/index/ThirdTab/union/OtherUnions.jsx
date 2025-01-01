import React from 'react'
import Typography from "@mui/material/Typography";
import ThirdTabAccordion from '../components/ThirdTabAccordion';
import OtherUnionsAccordionDetails from '../components/OtherUnionsAccordionDetails';

export default function ThirdTabOtherUnions({ primeBusiness, user, unions }) {
    const userIsABusinessAgent = user?.businesses.map(business => {
        return business.agentCode
        // === user.code
    }).includes(`${user.code}`)

    console.log("userIsABusinessAgent", userIsABusinessAgent);

    return (
        <React.Fragment>
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>

                " سایر اتحادها" : "برای عضویت در اتحادها بایستی نماینده کسب و کار اصلی باشید"

            </Typography>
            {unions.map((union) => {
                return <ThirdTabAccordion {...{ primeBusiness, user, union }} accordionDetails={OtherUnionsAccordionDetails} key={union._id} />
            })}
        </React.Fragment>

    )
}

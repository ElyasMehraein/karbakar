import React from 'react'
import Typography from "@mui/material/Typography";
import ThirdTabAccordion from '../components/ThirdTabAccordion';
import OtherUnionsAccordionDetails from '../components/OtherUnionsAccordionDetails';

export default function OtherUnions({ primeBusiness, user, unions }) {
    const userIsABusinessAgent = user?.businesses?.some(business => Number(business.agentCode) === Number(user.code));

    return (
        <React.Fragment>
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                {userIsABusinessAgent ?
                    " سایر اتحادها" : "برای عضویت در اتحادها بایستی نماینده یک کسب و کار باشید"
                }
            </Typography>
            {unions.map((union) => {
                return <ThirdTabAccordion {...{ primeBusiness, user, union }} accordionDetails={OtherUnionsAccordionDetails} key={union._id} />
            })}
        </React.Fragment>

    )
}

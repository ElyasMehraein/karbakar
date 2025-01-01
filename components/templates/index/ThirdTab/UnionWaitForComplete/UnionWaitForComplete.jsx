import React from 'react'
import Typography from "@mui/material/Typography";
import UnionsWhichNeedYourProductsAccordion from '../components/UnionsWhichNeedYourProductsAccordion';
import OtherUnionsAccordionDetails from '../components/OtherUnionsAccordionDetails';

export default function UnionWaitForComplete({ primeBusiness, user, unions }) {

    return (
        <React.Fragment>
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                اتحادهایی که شما عضو شدید اما پیشنهادها و نیازهای باقی مانده دارد
            </Typography>
            {unions.map((union) => {
                return <UnionsWhichNeedYourProductsAccordion {...{ primeBusiness, user, union }} accordionDetails={OtherUnionsAccordionDetails} key={union._id} />
            })}
        </React.Fragment>

    )
}
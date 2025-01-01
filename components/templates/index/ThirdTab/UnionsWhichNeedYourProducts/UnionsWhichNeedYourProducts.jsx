import React from 'react'
import Typography from "@mui/material/Typography";
import OtherUnionsAccordionDetails from '../components/OtherUnionsAccordionDetails';
import UnionsWhichNeedYourProductsAccordion from './UnionsWhichNeedYourProductsAccordion';

export default function UnionsWhichNeedYourProducts({ primeBusiness, user, unions }) {

    return (
        <React.Fragment>
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                اتحاد هایی که به محصولات کسب و کارهای شما نیاز دارند
            </Typography>
            {unions.map((union) => {
                return <UnionsWhichNeedYourProductsAccordion {...{ primeBusiness, user, union }} accordionDetails={OtherUnionsAccordionDetails} key={union._id} />
            })}
        </React.Fragment>

    )
}

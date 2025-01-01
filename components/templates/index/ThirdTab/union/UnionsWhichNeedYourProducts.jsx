import React from 'react'
import Typography from "@mui/material/Typography";
import ThirdTabAccordion from '../components/ThirdTabAccordion';
import OtherUnionsAccordionDetails from '../components/OtherUnionsAccordionDetails';

export default function UnionsWhichNeedYourProducts({ primeBusiness, user, unions }) {

    return (
        <React.Fragment>
            <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                اتحاد هایی که به محصولات کسب و کارهای شما نیاز دارند
            </Typography>
            {unions.map((union) => {
                console.log("union", union);
                
                return <ThirdTabAccordion {...{ primeBusiness, user, union }} accordionDetails={OtherUnionsAccordionDetails} key={union._id} />
            })}
        </React.Fragment>

    )
}

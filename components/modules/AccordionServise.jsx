import React from 'react'
import { Accordion, AccordionDetails, Chip } from "@mui/material";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

export default function AccordionServise({children}) {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
            <Chip
                label="راهنمایی"
                sx={{ direction: 'ltr' }}
                onClick={() => setExpanded(!expanded)}
                icon={<QuestionMarkOutlinedIcon sx={{ fontSize: 16 }} />}
            />
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

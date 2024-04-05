"user client"
import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
// import OthersRequestFrames from "./OthersRequestFrames";
import Typography from "@mui/material/Typography";
import YourRequestFrames from "./YourRequestFrames";
import { mainTabYourReqText } from "@/components/typoRepo";
import { Accordion, AccordionDetails, Chip, Container } from "@mui/material";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';


const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));


export default function YourReq() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
    <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
        <Chip
          label="راهنمایی"
          sx={{ direction: 'ltr' }}
          onClick={() => setExpanded(!expanded)}
          icon={<QuestionMarkOutlinedIcon />}
        />
        <AccordionDetails>
        {mainTabYourReqText}

        </AccordionDetails>
      </Accordion>
      <Divider sx={{ fontWeight: 'bold' }} textAlign="center">درخواست های تایید شده</Divider>
      <YourRequestFrames />
      <YourRequestFrames />
      <Divider sx={{ fontWeight: 'bold' }} textAlign="center">درخواست های منتظر تایید</Divider>
      <YourRequestFrames />
      <YourRequestFrames />
      <YourRequestFrames />
      <YourRequestFrames />
      <YourRequestFrames />
      <YourRequestFrames />
      <YourRequestFrames />
    </>
  );
}

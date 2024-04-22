"user client"
import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import YourRequestFrames from "./YourRequestFrames";
import { mainTabYourReqText } from "@/components/typoRepo";
import { Accordion, AccordionDetails, Chip, Container } from "@mui/material";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';


export default function MyRequests() {
  const [expanded, setExpanded] = React.useState(false);
  const [requests, setRequests] = React.useState("")
  React.useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await fetch("/api/requests/myRequests/", { method: "GET" })
        if (res.status === 200) {
          const data = await res.json()
          const requests = data.data
          setRequests(requests)
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
    getRequests()
  }, []);
  console.log("requests", requests);

  return (
    <>
      <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
        <Chip
          label="راهنمایی"
          sx={{ direction: 'ltr' }}
          onClick={() => setExpanded(!expanded)}
          icon={<QuestionMarkOutlinedIcon sx={{ fontSize: 16 }} />}
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

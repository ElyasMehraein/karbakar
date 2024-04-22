import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import YourRequestFrames from "./YourRequestFrames";
import { mainTabYourReqText } from "@/components/typoRepo";
import { Accordion, AccordionDetails, Chip, Container, Box, CircularProgress } from "@mui/material";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

export default function MyRequests() {
  const [expanded, setExpanded] = React.useState(false);
  const [requests, setRequests] = React.useState([]); // Use an empty array

  React.useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await fetch("/api/requests/myRequests/", { method: "GET" });
        if (res.status === 200) {
          const data = await res.json();
          const requests = data.data;
          setRequests(requests);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    getRequests();
  }, []);

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
      {requests.length > 0 ? (
        requests.map((request) => (
          <Box key={request._id}>
            {request.acceptedBy && (
              <Divider sx={{ fontWeight: 'bold' }} textAlign="center">
                درخواست های تایید شده
              </Divider>
            )}
            {request.acceptedBy?.map((accepter) => (
              <YourRequestFrames accepter={accepter} key={accepter} />
            ))}

            {request.needMoreInfo && (
              <Divider sx={{ fontWeight: 'bold' }} textAlign="center">
                درخواست های منتظر تایید
              </Divider>
            )}
            {request.needMoreInfo?.map((accepter) => (
              <YourRequestFrames accepter={accepter} key={accepter} />
            ))}
          </Box>
        ))
      ) : (
        <Box className="inMiddle">
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

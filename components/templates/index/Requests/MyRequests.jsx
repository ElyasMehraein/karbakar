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
  const [requests, setRequests] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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
      } finally {
        setIsLoading(false);
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
      {isLoading ?
        <Box className="inMiddle">
          <CircularProgress />
        </Box>
        :
        <Box>
          {requests.length === 0 && (
            <Typography variant="h6" align="center">
              هیچ درخواستی یافت نشد
            </Typography>
          )}
          {requests.some(request => request.acceptedBy) && (
            <Divider sx={{ fontWeight: 'bold' }} textAlign="center">
              درخواست های تایید شده
            </Divider>
          )
          }
          {requests.map((request) => (
            request.acceptedBy &&
            <YourRequestFrames request={request} key={request._id} />

          ))}
          {requests.some(request => request.needMoreInfo) && (
            <Divider sx={{ fontWeight: 'bold' }} textAlign="center">
              درخواست های منتظر اطلاعات بیشتر
            </Divider>
          )
          }
          {requests.map((request) => (
            request.needMoreInfo?.map((infoSeeker) => (
              <YourRequestFrames request={request} key={infoSeeker} />
            ))
          ))}
          {
            < Divider sx={{ fontWeight: 'bold' }} textAlign="center">
              درخواست های بدون پاسخ
            </Divider>
          }
          {requests.map((request) => (
            !request.needMoreInfo[0] && !request.acceptedBy[0] &&
            <YourRequestFrames request={request} key={request._id} />
          ))}
        </Box >
      }
    </>
  );
}

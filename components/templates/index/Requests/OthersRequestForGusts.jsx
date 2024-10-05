import React from 'react';
import { Accordion, AccordionDetails, Card, CardContent, CardHeader, Chip, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useEffect } from "react";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const OthersRequestForGusts = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await fetch("/api/requests/othersRequests/", { method: "GET" })
        if (res.status === 200) {
          const data = await res.json()
          setData(data.data)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
    getRequests()
  }, []);

  const renderGuilds = () => {
    const uniqueGuilds = [...new Set(data.map((item) => item.guild))];
    return uniqueGuilds.map((guild) => (
      <div key={guild}>
        <StyledDivider>
          <StyledTypography variant="h6">{guild}</StyledTypography>
        </StyledDivider>
        {data.filter((item) => item.guild === guild).map((item) => (
          <StyledCard key={item._id}>
            <StyledCardHeader title={item.title} />
            <CardContent>
              <Typography variant="body2">{item.message}</Typography>
            </CardContent>
          </StyledCard>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
        <Chip
          label="راهنمایی"
          sx={{ direction: 'ltr' }}
          onClick={() => setExpanded(!expanded)}
          icon={<QuestionMarkOutlinedIcon sx={{ fontSize: 16 }} />}
        />
        <Typography fontSize={14}>
          محصولاتی که کسب و کارها با هم مبادله می کنند را مشاهده می نمایید
          <br />
          لیست تمام کسب و کارها را می توانید از منوی سمت راست ببینید
          <br />
          برای پیوستن به جامعه کارباکار ثبت نام کنید.
        </Typography>

        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
      {!isLoading && renderGuilds()}
    </div>
  );
};

export default OthersRequestForGusts;

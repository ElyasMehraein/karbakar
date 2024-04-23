import * as React from "react";
import { styled } from "@mui/material/styles";
import { useState } from "react";
// import Guild from "@/components/modules/Guild";
import { useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ItsAvatar from "@/components/modules/ItsAvatar";
import TableBusiness from "../../business/TableBusiness";
import Typography from '@mui/material/Typography';
import { Card, CardContent, Chip, Container, Divider, ListItemButton } from "@mui/material";
import { useRouter } from "next/navigation";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import { OthersRequestText } from "@/components/typoRepo";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';


const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function OthersRequest({ user, distinctGuilds }) {
  const router = useRouter()
  const [requests, setRequests] = useState("")



  const userPrimeJobBusinesses = user.businesses.filter(
    (business) => business._id === user.primeJob
  );
  const userNonPrimeJobBusinesses = user.businesses.filter(
    (business) => business._id !== user.primeJob
  );
  
  const userPrimeJobBusinessGuild = userPrimeJobBusinesses.map((business) => business.guildname)
  const userNonPrimeJobBusinessesGuilds = userNonPrimeJobBusinesses.map((business) => business.guildname)
  const userBusinessesGuilds = [...userPrimeJobBusinessGuild,...userNonPrimeJobBusinessesGuilds]

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await fetch("/api/requests/othersRequests/", { method: "GET" })
        if (res.status === 200) {
          const data = await res.json()
          const requests = data.data
          const userBusinessGuildsSet = new Set(userBusinessesGuilds);
          const userBusinessGuildRequests = requests.filter((request) => userBusinessGuildsSet.has(request.guild));
          const otherGuildRequests = requests.filter((request) => !userBusinessGuildsSet.has(request.guild));

          const allRequests = userBusinessGuildRequests.concat(otherGuildRequests);

          setRequests(allRequests)
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
    getRequests()
  }, []);

  const isUserAreBusinessAgent = user?.businesses.some((business) => {
    return Number(business.agentCode) === user.code
  })

  async function acceptOrAskForMoreInfo(MyAnswer, requestID) {
    const res = await fetch('api/requests/acceptOrAskForMoreInfo', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ MyAnswer, requestID })
    })
    if (res.status === 500) {
      console.log("server error", res);
    } else if (res.status === 201) {
      location.reload()
      console.log("Request signed successfully");
    } else if (res.status === 406) {
      console.log("you are not business Agent!");

    }
  }

  const renderByGuilds = () => {
    const uniqueGuilds = [...new Set(requests.map((request) => request.guild))];
    return uniqueGuilds.map((guild) => (
      <Box key={guild}>
        <Divider sx={{ mb: 1, fontSize: '12px' ,fontWeight: 'bold'}} className={"text-extrabold"} textAlign="left">
          {guild}
        </Divider>
        {requests.filter((request) => request.guild === guild).map((request) => {
          const isAlredyAccepted = request.acceptedBy.some((acceptor) => {
            return acceptor === user.primeJob
          })
          const isAlredyAskedForMoreInfo = request.needMoreInfo.some((infoSeeker) => {
            return infoSeeker === user.primeJob
          })
          return (
            <Accordion key={request._id} sx={{bgcolor : blue[50]}} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <List>
                  <ListItem sx={{ m: 0, p: 0 }}>
                    <ListItemText align='right' primary={request.title} secondary={request.message} />
                  </ListItem>
                </List>
              </AccordionSummary>
              {
                userBusinessesGuilds.includes(request.guild) &&
                <AccordionDetails>
                  <ListItemButton onClick={() => router.push(`/${request.requesterBusiness.businessName}`)}>
                    <ListItemAvatar >
                      <Avatar sx={{ width: 40, height: 40 }}>
                        <ItsAvatar isAvatar={request.requesterBusiness.isAvatar} userCodeOrBusinessBrand={request.requesterBusiness.businessName} alt="workers avatar" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText align='right' primary={request.requesterBusiness.businessName} secondary={request.requesterBusiness.businessBrand} />
                  </ListItemButton>
                  <Typography sx={{ color: 'text.secondary' }}>{request.requesterBusiness.bio}</Typography>
                  <TableBusiness business={request.requesterBusiness} />
                </AccordionDetails>
              }
              <AccordionActions>
                {isUserAreBusinessAgent &&
                  <>
                    <Button disabled={isAlredyAskedForMoreInfo} onClick={() => acceptOrAskForMoreInfo("askForMoreInfo", request._id)} sx={{ ml: 4 }} variant="outlined">درخواست اطلاعات بیشتر</Button>
                    <Button disabled={isAlredyAccepted} onClick={() => acceptOrAskForMoreInfo("accept", request._id)} variant="outlined">تایید درخواست</Button>
                  </>

                }


              </AccordionActions>
            </Accordion>
          )
        })}
      </Box>
    ));
  }
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Root>
      <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
        <Chip
          label="راهنمایی"
          sx={{ direction: 'ltr' }}
          onClick={() => setExpanded(!expanded)}
          icon={<QuestionMarkOutlinedIcon sx={{ fontSize: 16 }} />}
        />
        <AccordionDetails>
          <Typography>
            {OthersRequestText}
          </Typography>

        </AccordionDetails>
      </Accordion>
      {requests ?
        renderByGuilds()
        :
        <Box className="inMiddle">
          <CircularProgress />
        </Box>
      }

    </Root>
  );
}

// const [defaultGuild, setDefaultGuild] = useState("")
// const updateGuildname = (newGuildname) => {
//   setDefaultGuild(newGuildname);
// };
// <Guild {...{ user, updateGuildname, distinctGuilds }} />
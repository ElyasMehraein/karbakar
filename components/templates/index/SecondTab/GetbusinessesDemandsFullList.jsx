"use client"
import * as React from "react";
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ItsAvatar from '@/components/modules/ItsAvatar'
import { Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails } from "@mui/material";
import { SecondTabText } from "@/components/typoRepo";
import AccordionServise from "@/components/modules/AccordionServise";

export default function GetbusinessesDemandsFullList() {

  const router = useRouter()
  const [businesses, setBusinesses] = useState([]);
  const [groupedBusinesses, setGroupedBusinesses] = useState({});

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const res = await fetch("/api/getbusinessesDemandsFullList", { method: "GET" })
        if (res.status === 200) {
          const { data } = await res.json()
          setBusinesses(data)
           // Group businesses by guild
          const grouped = data.reduce((acc, business) => {
            business.demandsForGuilds.forEach(demands => {
              if (!acc[demands.guild.guildName]) {
                acc[demands.guild.guildName] = [];
              }
              acc[demands.guild.guildName].push(business);
            });
            return acc;
          }, {});
          setGroupedBusinesses(grouped);
        } else if ((res.status === 403)) {
          console.log("unauthorized access");
        }
      } catch (error) {
        console.error("Error fetching Businesses:", error);
      }
    }
    getBusinesses()
  }, [])

  return (
    <Container maxWidth="md">
      <AccordionServise>
        {SecondTabText()}
      </AccordionServise>
      <Box className='inMiddle'
        sx={{
          '& .MuiTextField-root': { width: '30ch' },
          my: 3
        }}
        display="flex" flexDirection="column">
        {businesses.length ?
          <>
            {Object.entries(groupedBusinesses).map(([guildName, businesses]) => (
              <Box key={guildName}>
                <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                  {guildName}
                </Typography>
                {businesses.map((business) => (
                  <Accordion
                    key={business._id}
                    sx={{ width: '100%', bgcolor: blue[50], my: 1 }} // عرض ثابت برای همه‌ی Accordionها
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="pane-content"
                      id="pane-header"
                      sx={{ display: "flex", alignItems: "center", width: "100%" }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <ItsAvatar userCodeOrBusinessBrand={business.businessName} alt=" avatar" />
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            mr: 2
                          }}
                        >
                          <Typography sx={{ fontSize: 12, m: 0, fontWeight: 'bold' }} textAlign={"right"}>
                            {business.businessBrand}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 12,
                              display: '-webkit-box',
                              overflow: 'hidden',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 2
                            }}
                            align="justify" dir="rtl" >
                            {business.businessName}
                            {business.bio && " — " + business.bio}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {business.demandsForGuilds
                        .map((guild) => guild.requestText)
                        .join(", ")
                        || "کاربر برای این درخواست توضیحی قرار نداده است"}
                    </AccordionDetails>
                    <AccordionActions>
                      <Button
                        onClick={() => router.push(`/${business.businessName}`)}>
                        مشاهده کسب و کار
                      </Button>
                    </AccordionActions>
                  </Accordion>
                ))}
              </Box>
            ))}
          </>
          :
          (!businesses.length) &&
          <Typography>کسب و کاری برای نمایش وجود ندارد </Typography>
        }
      </Box>
    </Container>
  )
}
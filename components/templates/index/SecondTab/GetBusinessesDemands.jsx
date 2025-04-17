"use client"
import * as React from "react";
import { Box, Container, Typography, Button, Accordion, AccordionDetails, AccordionActions, AccordionSummary } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ItsAvatar from '@/components/modules/ItsAvatar';
import { blue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionServise from "@/components/modules/AccordionServise";
import { SecondTabGuestText } from "@/components/typoRepo";

export default function GetBusinessesDemands() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState({}); // مقدار اولیه به آبجکت تغییر داده شد

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const res = await fetch("/api/getbusinessesDemandsFullList", { method: "GET" });
        if (res.status === 200) {
          const { data } = await res.json();
          setBusinesses(data); // مقدار را به عنوان یک آبجکت ذخیره می‌کنیم
        } else if (res.status === 403) {
          console.log("unauthorized access");
        }
      } catch (error) {
        console.error("Error fetching Businesses:", error);
      }
    };
    getBusinesses();
  }, []);

  return (
    <Container maxWidth="md">
      <AccordionServise expand={true} >
        {SecondTabGuestText()}
      </AccordionServise>
      <Box
        sx={{
          width: '100%',
          my: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch', // تمام فرزندان به عرض کامل کشیده شوند
        }}
      >
        {Object.keys(businesses).length ? (
          Object.entries(businesses).map(([guildId, { guildName, jobCategory, businesses: businessList }]) => (
            <Box key={guildId} sx={{ width: '100%' }}>
              <Typography sx={{ mt: 3, mb: 1, fontSize: 12, fontWeight: 'bold' }}>
                {jobCategory} - {guildName}
              </Typography>
              {businessList.map((business) => (
                <Accordion
                  key={business._id}
                  sx={{
                    width: '100%', // اکوردئون به عرض کامل
                    bgcolor: blue[50],
                    my: 1,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="pane-content"
                    id="pane-header"
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <ItsAvatar userCodeOrBusinessBrand={business.businessName} alt="avatar" />
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          mr: 2,
                        }}
                      >
                        <Typography sx={{ fontSize: 12, m: 0, fontWeight: 'bold' }} textAlign="right">
                          {business.businessBrand}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 12,
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                          }}
                          align="justify"
                          dir="rtl"
                        >
                          {business.businessName}
                          {business.bio && " — " + business.bio}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ width: '100%' }}>
                    {business.demandsForGuilds
                      .map((guild) => guild.requestText)
                      .join(", ")
                      || "کاربر برای این درخواست توضیحی قرار نداده است"}
                  </AccordionDetails>
                  <AccordionActions>
                    <Button onClick={() => router.push(`/${business.businessName}`)}>
                      مشاهده کسب و کار
                    </Button>
                  </AccordionActions>
                </Accordion>
              ))}
            </Box>
          ))
        ) : (
          <Typography>کسب و کاری برای نمایش وجود ندارد</Typography>
        )}
      </Box>
    </Container>
  );
}

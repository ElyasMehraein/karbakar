import React from 'react'
import Typography from "@mui/material/Typography";

export default function Union({ primeBusiness, user, unions, category }) {
    const categoryText = {
        category1: "اتحاد هایی که به محصولات کسب و کارهای شما نیاز دارند",
        category2: "اتحادهایی که شما عضو هستید و نیازها و پیشنهادهای آن کامل شده و اعضا باید یکدیگر را تایید نمایند",
        category3: "اتحادهای شما که نیازها و پیشنهادهای آن کامل شده و اعضا باید یکدیگر را تایید نمایند",
        category4: "اتحاد های فعال شما",
        category5: "سایر اتحادها",
    };
    return (
        <React.Fragment>
                    <Typography>{categoryText[category]}</Typography>
                    <Accordion
        disableGutters
        sx={{ bgcolor: blue[50], my: 1, minWidth: 300, width: '100%' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ alignSelf: 'flex-start' }} />}
          aria-controls="pane-content"
          id="pane-header"
        // sx={{
        //   display: 'flex',
        //   flexDirection: 'row',
        //   justifyContent: 'space-between',
        //   // alignItems: 'flex-start',
        //   // pl: 1,
        //   // minHeight: 56,
        //   position: 'relative',
        // }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{ fontSize: 12, m: 0, fontWeight: 'bold' }}
              textAlign="right"
            >
              {union.unionName}
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
              align="justify"
              dir="rtl"
            >
              {union.slogan}
            </Typography>
          </Box>
        </AccordionSummary>

        {accordionDetails(union, user)}

        <AccordionActions>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography sx={{ mr: 1, fontSize: '12px' }}>
              {`مدت اتحاد: ${union.deadline} روز`}
            </Typography>
            {userIsABusinessAgent &&
              <Button variant="contained" color="primary" onClick={handleMembership}>
                عضویت
              </Button>
            }
          </Box>
        </AccordionActions>
      </Accordion>
        </React.Fragment>
    )
}

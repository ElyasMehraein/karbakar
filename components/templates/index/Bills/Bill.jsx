import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Accordion, AccordionDetails, Chip, Container } from '@mui/material'
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined'
import BillFrame from './BillFrame'
import { billText } from '@/components/typoRepo'

export default function Bill({ user, bills }) {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <Container maxWidth="md">
      <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
        <Chip
          label="راهنمایی"
          sx={{ direction: 'ltr' }}
          onClick={() => setExpanded(!expanded)}
          icon={<QuestionMarkOutlinedIcon sx={{ fontSize: 16 }} />}
        />
        <AccordionDetails>{billText()}</AccordionDetails>
      </Accordion>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'}>
        {bills.length == 0 ? (
          <Typography color="error">صورتحساب جدیدی ارسال نشده است</Typography>
        ) : (
          bills
            .filter(bill => bill.accepted == false)
            .map(bill => {
              return <BillFrame user={user} key={bill._id} bill={bill} />
            })
        )}
      </Box>
    </Container>
  )
}

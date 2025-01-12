import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Accordion, AccordionDetails, Chip, Container } from "@mui/material";
import modulesAutocomplete from "@/components/modules/modulesAutocomplete";
import DoneIcon from '@mui/icons-material/Done';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import BillFrame from "./BillFrame";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { billText } from "@/components/typoRepo";

export default function Bill({ user, bills }) {
  const [expanded, setExpanded] = React.useState(false);
  const [alignment, setAlignment] = React.useState('new');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };


  return (
    <Container maxWidth="md" >
      <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
        <Chip
          label="راهنمایی"
          sx={{ direction: 'ltr' }}
          onClick={() => setExpanded(!expanded)}
          icon={<QuestionMarkOutlinedIcon sx={{ fontSize: 16 }} />}
        />
        <AccordionDetails>
          {billText()}
        </AccordionDetails>
      </Accordion>
      <Box display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
      >
        {bills.length == 0 ?
          <Typography color="error">
            هیچ صورتحسابی برای شما ارسال نشده است
          </Typography> :
          <>
            <ToggleButtonGroup
              sx={{ direction: "ltr", my: 1 }}
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="accepted">تایید شده</ToggleButton>
              <ToggleButton value="new">جدید</ToggleButton>
            </ToggleButtonGroup>
            {alignment === "new" && bills.filter((bill) => bill.accepted == false).map((bill) => {
              return <BillFrame user={user} key={bill._id} bill={bill} />
            })}
            {alignment === "accepted" && bills.filter((bill) => bill.accepted == true).map((bill) => {
              return <BillFrame user={user} key={bill._id} bill={bill} />
            })}
          </>}
      </Box>
    </Container>
  );
}

import React from 'react'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useActiveTab } from '@/components/context/ActiveTabContext';


export default function BillReportFrame({handleClose}) {
  const { setActiveTab } = useActiveTab();
  const handleClick = () => {
    handleClose()
    setActiveTab(3);
  };
  return (
    <Box >
      <Card sx={{ my: 1, bgcolor: "#e3f2fd" }} onClick={handleClick}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="body2">
            دریافت صورتحساب جدید
          </Typography>
        </CardContent>
        <CardContent >
          <Typography style={{ whiteSpace: 'pre-wrap' }}>
            شما یک صورتحساب جدید دریافت نموده اید. جهت مشاهده به سر برگ صورتحساب مراجعه نمایید
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

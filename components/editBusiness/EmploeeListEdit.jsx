import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import EmploeeList from "@/components/common/EmploeeList"
import SearchInEmploeeList from "@/components/common/SearchInEmploeeList"
import { Container, Typography } from '@mui/material';
const EmploeeListEdit = () => {
  return (
    <Container maxWidth="md">

      <List
        subheader={
          <ListSubheader>
            کارکنان کسب و کارکنان
          </ListSubheader>
        }
      >
        <SearchInEmploeeList/>
        <EmploeeList/>
        <Typography sx={{ py:1, textAlign: "center" }}>برای افرادی که اضافه می نمایید یک درخواست ارسال می شود</Typography>

      </List>
    </Container>
  )
}

export default EmploeeListEdit

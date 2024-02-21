import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import EmploeeList from "@/components/common/EmploeeList"
import { Container } from '@mui/material';
const EmploeeListEdit = () => {
  return (
    <Container maxWidth="md">

      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            کارکنان کسب و کارکنان
          </ListSubheader>
        }
      >
        <EmploeeList/>
      </List>
    </Container>
  )
}

export default EmploeeListEdit

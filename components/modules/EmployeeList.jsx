import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import ItsAvatar from './ItsAvatar';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

export default function EmployeeList({ business , logedUserCode, users}) {
    console.log("users", users);
    return (
        <Box>
            <Box dir="rtl" sx={{ display: 'flex', justifyContent: 'center' }}>
                <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
                    <Typography align='right' sx={{ mr: 2, fontWeight: 'bold' }} >
                        لیست کارکنان کسب و کار
                    </Typography>
                    {logedUserCode === Number(business.agentCode &&
                        // <Container maxWidth="md" >
                        <Autocomplete
                          className="inMiddle"
                          onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                              // Create a new value from the user input
                              updateGuildname(newValue);
                            } else if (newValue && newValue.inputValue) {
                              // Create a new value from the user input
                              updateGuildname(newValue.inputValue);
                            } else {
                              updateGuildname(newValue);
                            }
                          }}
                          filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            const { inputValue } = params;
                            // Suggest the creation of a new value
                            const isExisting = options.some((option) => inputValue === option);
                            if (inputValue !== '' && !isExisting) {
                              filtered.push({
                                inputValue,
                                title: `ایجاد صنف جدید "${inputValue}"`,
                              });
                            }
                  
                            return filtered;
                          }}
                          selectOnFocus
                          clearOnBlur
                          handleHomeEndKeys
                          id="free-solo-with-text-demo"
                          options={["majid","gajid"]}
                          getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                              return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                              return option.inputValue;
                            }
                            // Regular option
                            return option;
                          }}
                          renderOption={(props, option) => <li {...props} key={option}>{option.title ? option.title : option}</li>}
                          sx={{ py: 3, width: 300 }}
                          freeSolo
                          renderInput={(params) => (
                            <TextField required error={snackbarError} {...params} label="جستجوی کاربران" />
                          )}
                        />
                    //   </Container>
                    )}
                    {business.workers.sort((a, b) => Number(business.agentCode) === Number(a.code) ? -1 : Number(business.agentCode) === Number(b.code) ? 1 : 0).map((worker => {
                        return (
                            <React.Fragment key={worker._id}>
                                <ListItem >
                                    <ListItemAvatar >
                                        <Avatar sx={{ width: 40, height: 40 }} >
                                            <ItsAvatar userCodeOrBusinessBrand={worker.code} alt="workers avatar" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        align='right'
                                        primary={Number(business.agentCode) === Number(worker.code) ? worker.userName + " — " + " نماینده" : worker.userName}
                                        secondary={worker.bio}
                                    />
                                    <ListItemText />
                                </ListItem>
                                <Divider variant="inset" />
                            </React.Fragment>
                        )
                    }))}
                </List>
            </Box>
        </Box>
    );
}

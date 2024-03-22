"use client"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Container } from '@mui/material';

const filter = createFilterOptions();

export default function Guild({ updateGuildname, distinctGuilds ,snackbarError}) {


  return (
    <Container maxWidth="md" >
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
        options={distinctGuilds}
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
          <TextField required error={snackbarError} {...params} label="انتخاب صنف" />
        )}
      />
    </Container>

  );
}

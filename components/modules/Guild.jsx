"use client"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Container } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

const filter = createFilterOptions();

export default function Guild({ updateGuildname, distinctGuilds, user,TextFieldText }) {
  const primeJobguildname = user?.businesses.find((business) => business._id === user.primeJob)?.guildname


  return (
    <Autocomplete
      defaultValue={primeJobguildname}
      size="small"
      className="inMiddle"
      onInputChange={(event, newValue) => {
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
            title: `اضافه کردن صنف جدید "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      // clearOnBlur
      freeSolo
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={distinctGuilds||[]}
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
      // freeSolo
      fullWidth
      renderInput={(params) => (

        <TextField {...params} label={TextFieldText} />
      )}
    />

  );
}

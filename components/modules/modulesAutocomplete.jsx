'use client'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { Container } from '@mui/material'

const filter = createFilterOptions()

export default function modulesAutocomplete({ optionsArray, label, addMessage, onChangeHandler }) {
  return (
    <Container maxWidth="md">
      <Autocomplete
        className="inMiddle"
        onChange={(event, newValue) => {
          onChangeHandler(newValue)
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          const { inputValue } = params
          // Suggest the creation of a new value
          const isExisting = options.some(option => inputValue === option.title)
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `${(addMessage, inputValue)}`,
            })
          }

          return filtered
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={optionsArray}
        getOptionLabel={option => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue
          }
          // Regular option
          return option.title
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.title}>
            {option.title}
          </li>
        )}
        sx={{ py: 3, width: 300 }}
        freeSolo
        renderInput={params => <TextField {...params} label={label} />}
      />
    </Container>
  )
}

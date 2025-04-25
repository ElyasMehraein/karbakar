'use client'
import { Box, Container, TextField, Typography, Autocomplete } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState, useEffect } from 'react'
import jobCategoriesData from '@/utils/JobCategories'

export default function SelectCategoryAndGuild({ sendDataToParent, primeBusiness }) {
  // select category

  const [jobCategory, setJobCategory] = useState(primeBusiness?.guild.jobCategory ?? undefined)
  const formattedOptions = Object.entries(jobCategoriesData).flatMap(([group, categories]) =>
    categories.map(category => ({ label: category, group }))
  )
  const defaultCategory = primeBusiness
    ? formattedOptions.find(option => option.label === primeBusiness.guild.jobCategory)
    : undefined
  const isOptionEqualToValue = (option, value) => {
    return option.label === value.label
  }

  // select guild

  const [guilds, setGuilds] = useState([])
  const [guild, setGuild] = useState(null)
  const [guildName, setGuildName] = useState('')

  const handleChange = event => {
    setGuildName(event.target.value)
    setGuild(guilds.find(g => g.guildName === event.target.value))
  }

  let jobCategoryChangeHandler = (e, value) => {
    setGuildName('')
    setJobCategory(value?.label)
  }
  useEffect(() => {
    const getGuilds = async () => {
      try {
        const res = await fetch('/api/getGuilds', { method: 'GET' })
        if (res.status === 200) {
          const { data } = await res.json()
          let recivedGuilds = data
            .filter(guild => guild.jobCategory === jobCategory)
            .map(guild => guild)

          setGuilds(recivedGuilds.length ? recivedGuilds : [])
        } else if (res.status === 403) {
          console.log('unauthorized access')
        }
      } catch (error) {
        console.error('Error fetching Guilds:', error)
      }
    }
    getGuilds()
  }, [jobCategory])

  useEffect(() => {
    setGuild(guilds[0])
    setGuildName(guilds[0] ? guilds[0].guildName : '')
  }, [guilds])
  // send guild to parent
  useEffect(() => {
    sendDataToParent(guild)
  }, [sendDataToParent, guild, jobCategory])

  return (
    <Container maxWidth="md">
      <Box
        className="inMiddle"
        sx={{
          '& .MuiTextField-root': { width: '300px' },
          my: 3,
        }}
        display="flex"
        flexDirection="column"
      >
        <Autocomplete
          sx={{ my: 1 }}
          options={formattedOptions}
          groupBy={option => option.group}
          getOptionLabel={option => option.label}
          renderInput={params => <TextField {...params} label="انتخاب دسته بندی" />}
          isOptionEqualToValue={isOptionEqualToValue}
          onChange={jobCategoryChangeHandler}
          defaultValue={defaultCategory ?? null}
        />
        {jobCategory ? (
          guilds.length ? (
            <>
              <Typography sx={{ py: 1, textAlign: 'center', fontSize: 12 }}>
                صنف مد نظر خود را انتخاب نمایید
              </Typography>
              <FormControl sx={{ my: 1, width: 300 }}>
                <InputLabel id="chose-business-lable">عنوان صنف</InputLabel>
                <Select
                  labelId="chose-business-lable"
                  id="chose-business"
                  value={guildName}
                  label="عنوان صنف"
                  onChange={handleChange}
                >
                  {guilds.map(guild => (
                    <MenuItem key={guild._id} value={guild.guildName}>
                      {guild.guildName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <Typography sx={{ py: 1, textAlign: 'center', fontSize: 12, color: 'red' }}>
              در این دسته بندی هنوز صنفی ایجاد نشده و وجود ندارد؛ دسته بندی های دیگر را امتحان کنید
            </Typography>
          )
        ) : null}
      </Box>
    </Container>
  )
}

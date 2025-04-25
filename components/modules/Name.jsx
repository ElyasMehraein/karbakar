import { Box, Container, Typography } from '@mui/material'
import React from 'react'

export default function Name({ user, business }) {
  const name = user?.userName || business?.businessBrand
  return (
    <Container maxWidth="md">
      <Box sx={{ width: 200 }} textAlign={'right'}>
        <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
        <Typography sx={{ fontWeight: 'bold' }}>{business?.businessName}</Typography>
      </Box>
    </Container>
  )
}

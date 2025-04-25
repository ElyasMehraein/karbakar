import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram'
import AddIcCallIcon from '@mui/icons-material/AddIcCall'
import EmailIcon from '@mui/icons-material/Email'
import WebIcon from '@mui/icons-material/Web'
import ComputerIcon from '@mui/icons-material/Computer'
import Box from '@mui/material/Box'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import { Button, Container, Icon, IconButton, Typography } from '@mui/material'
import Link from 'next/link'

export default function contact({ user, business }) {
  const { phone, email, personalPage, instagram } = user || business

  const geoLink = ''
  return (
    <Box>
      <Container maxWidth="md">
        <Box sx={{ mb: 1 }} display="flex" justifyContent="space-evenly">
          {phone && (
            <Box display="flex" flexDirection="column" align="center">
              <a
                style={{ textDecoration: 'none', color: 'inherit' }}
                underline="none"
                color="inherit"
                href={`tel:${phone}`}
              >
                <Box>
                  <AddIcCallIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography>تماس</Typography>
                </Box>
              </a>
            </Box>
          )}
          {email && (
            <Box sx={{ pr: 2 }} display="flex" flexDirection="column" align="center">
              <a
                style={{ textDecoration: 'none', color: 'inherit' }}
                underline="none"
                color="inherit"
                key="Email"
                href={`mailto:${email}`}
              >
                <Box>
                  <EmailIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography>ایمیل</Typography>
                </Box>
              </a>
            </Box>
          )}
          {personalPage && (
            <Box sx={{ pr: 2 }} display="flex" flexDirection="column" align="center">
              <a
                style={{ textDecoration: 'none', color: 'inherit' }}
                underline="none"
                color="inherit"
                target="_blank"
                href={personalPage}
              >
                <Box>
                  <ComputerIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography>صفحه شخصی</Typography>
                </Box>
              </a>
            </Box>
          )}
          {instagram && (
            <Box sx={{ pr: 2 }} display="flex" flexDirection="column" align="center">
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                underline="none"
                color="inherit"
                target="_blank"
                href={`https://www.instagram.com/${instagram}`}
                passHref
              >
                <Box>
                  <InstagramIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography>اینستاگرام</Typography>
                </Box>
              </Link>
            </Box>
          )}
          {geoLink && (
            <Box sx={{ pr: 2 }} display="flex" flexDirection="column" align="center">
              <a
                style={{ textDecoration: 'none', color: 'inherit' }}
                underline="none"
                color="inherit"
                target="_blank"
                href={geoLink}
              >
                <Box>
                  <PersonPinCircleIcon fontSize="large" />
                </Box>
                <Box>
                  <Typography>لوکیشن</Typography>
                </Box>
              </a>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}

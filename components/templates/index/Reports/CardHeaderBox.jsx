import React from 'react'
import ItsAvatar from '@/components/modules/ItsAvatar'
import CardHeader from '@mui/material/CardHeader'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'

export default function CardHeaderBox({ report, title }) {
  const router = useRouter()

  return (
    <>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="body2">
          {title}
        </Typography>
      </CardContent>
      <Box
        sx={{ display: 'flex', alignItems: 'right', flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <CardHeader
          sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}
          avatar={
            <Box sx={{ ml: 1, width: 40, height: 40 }}>
              <ItsAvatar userCodeOrBusinessBrand={report.business?.businessName} />
            </Box>
          }
          title={report.business?.businessBrand}
          subheader={report.business?.businessName}
          onClick={() => router.push(`/${report.business.businessName}`)}
        />
        <ArrowBackIcon
          sx={{
            margin: { sm: 'auto' },
            marginX: { xs: '20%' },
            transform: { xs: 'rotate(-90deg)', sm: 'rotate(0deg)' },
          }}
        />
        <CardHeader
          sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}
          avatar={
            <Box sx={{ ml: 1, width: 40, height: 40 }}>
              <ItsAvatar userCodeOrBusinessBrand={report.recepiant?.userName} />
            </Box>
          }
          title={report.recepiant?.userName}
          subheader={report.recepiant?.bio}
          onClick={() => router.push(`/${report.recepiant.code}`)}
        />
      </Box>
    </>
  )
}

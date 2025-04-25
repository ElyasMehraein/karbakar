'use client'
import * as React from 'react'
import { FirtstTabText2 } from '@/components/typoRepo'
import { Box, Container, Typography } from '@mui/material'
import AccordionServise from '@/components/modules/AccordionServise'
import { orderByDistance, getDistance } from 'geolib'
import FirstTabMonthlyCommitmentBox from '@/components/templates/index/FirstTab/FirstTabMonthlyCommitmentBox'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useEffect } from 'react'

const ShowMyLocation = dynamic(() => import('@/components/modules/ShowMyLocation'), { ssr: false })

export default function FirstTabGuestView({ guestRelations }) {
  const businesses = guestRelations
    .filter(relation => relation.provider?.monthlyCommitment?.length > 0)
    .map(relation => relation.provider)

  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [businessesOrderByDistance, setBusinessesOrderByDistance] = useState([])

  const setLocation = function (latitude, longitude) {
    setLatitude(latitude)
    setLongitude(longitude)
  }

  useEffect(() => {
    if (!latitude || !longitude) return

    const filteredBusinesses = businesses.filter(business => {
      return business.latitude && business.longitude
    }) // فقط مواردی که موقعیت دارند

    if (filteredBusinesses.length === 0) return // اگر هیچ کسب‌وکاری موقعیت نداشت، اجرا نشود

    const sortedBusinesses = orderByDistance({ latitude, longitude }, filteredBusinesses)

    // جلوگیری از رندر بی‌مورد
    if (JSON.stringify(sortedBusinesses) !== JSON.stringify(businessesOrderByDistance)) {
      setBusinessesOrderByDistance(sortedBusinesses)
    }
  }, [latitude, longitude])

  return (
    <Container maxWidth="md">
      <AccordionServise>{FirtstTabText2()}</AccordionServise>
      <Box
        className="inMiddle"
        sx={{
          '& .MuiTextField-root': { width: '30ch' },
          my: 3,
        }}
        display="flex"
        flexDirection="column"
      >
        <ShowMyLocation setLocation={setLocation} />

        <Typography fontSize={12}>محصولاتی که بصورت ماهانه در اختیار اعضا قرار می گیرد</Typography>
        <Typography fontSize={12}>
          برای مرتب سازی بر اساس فاصله، موقعیت مکانی خود را بروز نمایید
        </Typography>
        <Typography color="error" fontSize={12}>
          موقعیت مکانی شما برای همین صفحه کاربرد دارد و جایی ذخیره نمی شود
        </Typography>

        {businessesOrderByDistance.length > 0 ? (
          businessesOrderByDistance.map(business => {
            return (
              <FirstTabMonthlyCommitmentBox
                key={business._id}
                {...{ business, latitude, longitude }}
              />
            )
          })
        ) : businesses.length > 0 ? (
          businesses.map(business => {
            return (
              <FirstTabMonthlyCommitmentBox
                key={business._id}
                {...{ business, latitude, longitude }}
              />
            )
          })
        ) : (
          <Typography>در حال حاضر هیچ کسب و کاری محصولی ارائه نمی دهد</Typography>
        )}
      </Box>
    </Container>
  )
}

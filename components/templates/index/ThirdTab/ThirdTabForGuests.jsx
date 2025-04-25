import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import { thirdTabText } from '@/components/typoRepo'
import AccordionServise from '@/components/modules/AccordionServise'
import UnionListForGuests from './components/UnionListForGuests'

export default function ThirdTabForGuests() {
  const [unions, setUnions] = useState([])

  useEffect(() => {
    const getUnions = async () => {
      try {
        const res = await fetch('/api/getUnions', { method: 'GET' })
        if (res.ok) {
          const { data } = await res.json()
          setUnions(data)
        } else {
          console.log(res.status === 403 ? 'unauthorized access' : 'Failed to fetch unions')
        }
      } catch (error) {
        console.error('Error fetching Unions:', error)
      }
    }
    getUnions()
  }, [])
  return (
    <Container
      sx={{ mb: 10, maxWidth: 'md', display: 'flex', align: 'center', flexDirection: 'column' }}
    >
      <AccordionServise>{thirdTabText()}</AccordionServise>
      {unions.length > 0 ? (
        unions.map(union => <UnionListForGuests key={union._id} union={union} />)
      ) : (
        <Typography className="inMiddle">هنوز هیچ اتحادی برای نمایش وجود ندارد</Typography>
      )}
    </Container>
  )
}

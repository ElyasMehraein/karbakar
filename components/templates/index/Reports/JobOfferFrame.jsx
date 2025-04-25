import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { CircularProgress } from '@mui/material'
import { triggerSnackbar } from '@/utils/snackbarService'
import CardHeaderBox from './CardHeaderBox'

export default function JobOfferFrame({ report }) {
  const reportID = report._id
  const [freshReport, setFreshReport] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  const [positiveChoise, setPositiveChoise] = useState(false)

  const [isSeen, setIsSeen] = useState(false)

  useEffect(() => {
    const fetchReport = async () => {
      const response = await fetch(`/api/reports/${reportID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message || 'Failed to fetch report')
      }

      const data = await response.json()
      setFreshReport(data.data)
      setIsLoading(false)
    }
    fetchReport()
  }, [reportID, setIsSeen])

  const answer = async parameter => {
    setIsLoading(true)
    const res = await fetch('/api/reports/answerJobOffer', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportID: report._id, parameter }),
    })
    if (res.status === 201) {
      triggerSnackbar('پاسخ شما با موفقیت ثبت شد و به نماینده کسب و کار ارسال شد')
      if (parameter) {
        setPositiveChoise(true)
      }
    } else {
      triggerSnackbar('خطا از سمت سرور', 'error')
    }
    setIsLoading(false)
  }

  return (
    <Box>
      <Card sx={{ my: 1, bgcolor: '#e3f2fd' }}>
        <CardHeaderBox report={report} title={'پیشنهاد کار'} />
        {!freshReport || isLoading ? (
          <Box className="inMiddle">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <CardContent>
              <Typography style={{ whiteSpace: 'pre-wrap' }}>
                {freshReport.isAnswerNeed
                  ? 'این کسب و کار برای شما پیشنهاد کار ارسال نموده است آیا عضویت در این کسب و کار را می پذیرید؟'
                  : freshReport.answer || positiveChoise
                    ? 'شما به پیشنهاد کار این کسب و کار پاسخ مثبت دادید'
                    : 'شما به پیشنهاد کار این کسب و کار پاسخ منفی دادید'}
              </Typography>
            </CardContent>
            {freshReport?.isAnswerNeed && (
              <Stack direction="row" spacing={2} sx={{ ml: 2, mb: 2, direction: 'ltr' }}>
                <Button variant="outlined" color="error" onClick={() => answer(false)}>
                  رد
                </Button>
                <Button color="success" variant="outlined" onClick={() => answer(true)}>
                  تایید
                </Button>
              </Stack>
            )}
          </>
        )}
      </Card>
    </Box>
  )
}

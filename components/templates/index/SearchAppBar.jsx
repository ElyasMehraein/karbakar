import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { Avatar } from '@mui/material'
import Image from 'next/image'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ReportsMenu from './Reports/ReportsMenu'
import SearchBox from '@/components/modules/SearchBox'
import ItsAvatar from '@/components/modules/ItsAvatar'

export default function SearchAppBar({ user, menuClickHandler }) {
  const [isLoading, setIsLoading] = useState(true)
  const [unseenReportCounts, setUnseenReportCounts] = useState(0)
  const [reports, setReports] = useState([])

  useEffect(() => {
    const getReports = async () => {
      if (!user) return
      try {
        const res = await fetch('/api/reports/getReports', { method: 'GET' })
        if (res.status === 200) {
          const data = await res.json()
          setReports(data.data)
        } else if (res.status === 403) {
          console.log('unauthorized access')
        }
      } catch (error) {
        console.error('Error fetching reports:', error)
      }
    }
    setIsLoading(false)
    getReports()
  }, [user])

  const avatar = `/api/images/avatars/${user?.code}.jpg?timestamp=${new Date().getTime()}`

  useEffect(() => {
    if (reports) {
      setUnseenReportCounts(
        reports.filter(report => !report.isSeen && !report.isjobOffersAnswerd).length || 0
      )
    }
  }, [reports])

  const setIsSeen = async parameter => {
    const res = await fetch('/api/reports/setIsSeen', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parameter,
      }),
    })
    res.status === 201 && setUnseenReportCounts(0)
  }

  const userCode = user => {
    if (user.code) {
      return user.code
    }
    return null
  }

  const router = useRouter()
  const goToProfile = () => {
    router.push(`/${userCode(user)}`)
  }
  const signOut = async () => {
    const res = await fetch('/api/auth/logout', { method: 'GET' })
    if (res.status === 200) {
      router.push('/w')
    }
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const clickReports = async event => {
    setAnchorEl(event.currentTarget)
    setTimeout(() => setIsSeen(true), 5000)
  }
  const handleClose = async () => {
    clearTimeout(setIsSeen)
    setAnchorEl(null)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={menuClickHandler}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 1, width: '100% !important' }}>
          <SearchBox
          //  sx={{ width: '100% !important' }}
          />
        </Box>
        {!user ? (
          <Button
            size="small"
            sx={{ display: { xs: 'none', sm: 'block' }, mr: 1, minWidth: 110, maxWidth: 110 }}
            onClick={signOut}
            variant="contained"
            color="secondary"
          >
            ورود یا ثبت نام
          </Button>
        ) : (
          <Box sx={{ display: 'flex' }}>
            {reports && reports[0] && (
              <Tooltip title="Account settings">
                <IconButton
                  sx={{ width: 70, height: 70 }}
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={clickReports}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Badge badgeContent={unseenReportCounts} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
            <ReportsMenu
              user={user}
              reports={reports}
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
            />
            <IconButton
              sx={{ m: 0, width: 70, height: 70 }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              // aria-haspopup="true"
              color="inherit"
              onClick={goToProfile}
            >
              <ItsAvatar userCodeOrBusinessBrand={user?.code} alt="workers avatar" />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

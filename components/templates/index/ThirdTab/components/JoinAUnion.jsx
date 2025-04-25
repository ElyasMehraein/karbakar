import React, { useState } from 'react'
import {
  Button,
  Container,
  FormControl,
  IconButton,
  Slide,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import BasketSelection from '@/components/modules/BasketSelection'
import SelectCategoryAndGuild from '@/components/modules/SelectCategoryAndGuild'
import CustomSnackbar from '@/components/modules/CustomSnackbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function JoinAUnion({
  union,
  primeBusiness,
  user,
  MembershipOpen,
  dialogCloseHandler,
}) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [selectedBusinessName, setSelectedBusinessName] = useState(
    primeBusiness?.businessName || ''
  )
  const userBusinesses = user?.businesses?.map(business => business.businessName) || []
  const selectedBusiness =
    user?.businesses?.find(business => business.businessName === selectedBusinessName) || {}

  const [offerBasket, setOfferBasket] = useState([])
  const [demandBasket, setDemandBasket] = useState([])
  const [demandGuild, setDemandGuild] = useState(null)

  const joinAUnion = async () => {
    if (!selectedBusiness._id) return
    try {
      const res = await fetch('api/joinAUnion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unionID: union._id,
          businessID: selectedBusiness._id,
          offerBasket,
          demandBasket,
          demandGuildID: demandGuild?._id,
        }),
      })

      if (res.ok) {
        setOfferBasket([])
        setDemandBasket([])
        setOpenSnackbar(true)
      } else {
        console.error('Failed to join union')
      }
    } catch (error) {
      console.error('Error joining union:', error)
    }
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={MembershipOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={dialogCloseHandler}
      >
        <DialogTitle>عضویت در اتحاد</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={dialogCloseHandler}
          sx={{ position: 'absolute', left: 8, top: 8, color: 'gray' }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Container className="inMiddle" maxWidth="md" align="center">
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="chose-business-label">انتخاب کسب و کار</InputLabel>
              <Select
                labelId="chose-business-label"
                label="انتخاب کسب و کار"
                value={selectedBusinessName}
                onChange={e => setSelectedBusinessName(e.target.value)}
              >
                {userBusinesses.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography sx={{ my: 2, fontSize: 14 }}>
              سبد محصولاتی که می خواهید عرضه کنید
            </Typography>
            <BasketSelection parentBasketFunction={setOfferBasket} business={selectedBusiness} />

            <Typography sx={{ my: 2, fontSize: 14 }}>
              سبد محصولاتی که می خواهید دریافت کنید
            </Typography>
            <SelectCategoryAndGuild sendDataToParent={setDemandGuild} />
            <BasketSelection parentBasketFunction={setDemandBasket} guild={demandGuild} />
          </Container>
        </DialogContent>

        <DialogActions>
          <Typography sx={{ mx: 1, color: 'red', fontSize: 12 }}>
            با عضویت در اتحاد، اعضای فعلی را تایید می نمایید
          </Typography>
          <Button
            variant="contained"
            disabled={!(offerBasket.length && demandBasket.length && selectedBusinessName)}
            onClick={joinAUnion}
          >
            عضویت در اتحاد
          </Button>
        </DialogActions>
      </Dialog>

      <CustomSnackbar
        open={openSnackbar}
        onClose={() => window.location.reload()}
        message="به اتحاد ملحق شدید"
      />
    </React.Fragment>
  )
}

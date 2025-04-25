'use client'
import React, { useState } from 'react'
import MyAppBar from '@/components/modules/MyAppBar'
import CountactEdit from '@/components/modules/ContactEdit'
import BioEdit from '@/components/modules/BioEdit'
import ExplainEdit from '@/components/modules/ExplainEdit'
import NameEdit from '@/components/modules/NameEdit'
import EditLocation from './EditLocation'
import AddressEdit from './AddressEdit'
import CustomSnackbar from '@/components/modules/CustomSnackbar'
import EditHeader from '@/components/modules/EditHeader'
import EditAvatar from '../../modules/EditAvatar'
import EmployeeList from '@/components/modules/EmployeeList'

export default function EditBusiness({ business, logedUserCode, users }) {
  const [snackbarError, setSnackbarError] = useState(false)
  const [SnackbarMessage, setSnackbarMessage] = useState('محدودیت تعداد کارکتر را رعایت نمایید')
  const maxLengthError = parameter => {
    if (parameter) {
      setSnackbarMessage(parameter)
      setSnackbarError(true)
    }
  }
  return (
    <>
      <MyAppBar />
      <EditHeader business={business} />
      <EditAvatar business={business} />
      <NameEdit business={business} label={'نام کسب و کار'} maxLengthError={maxLengthError} />
      <AddressEdit business={business} maxLengthError={maxLengthError} />
      <BioEdit business={business} maxLengthError={maxLengthError} />
      <ExplainEdit business={business} maxLengthError={maxLengthError} />
      <CountactEdit business={business} maxLengthError={maxLengthError} />
      <EditLocation business={business} maxLengthError={maxLengthError} />
      <EmployeeList
        business={business}
        logedUserCode={logedUserCode}
        users={users}
        maxLengthError={maxLengthError}
      />

      <CustomSnackbar
        open={snackbarError}
        onClose={() => setSnackbarError(false)}
        message={SnackbarMessage}
        severity="error"
      />
    </>
  )
}

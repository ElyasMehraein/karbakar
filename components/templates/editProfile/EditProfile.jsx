'use client'
import React, { useState } from 'react'
import MyAppBar from '@/components/modules/MyAppBar'
import CountactEdit from '@/components/modules/ContactEdit'
import BioEdit from '@/components/modules/BioEdit'
import ExplainEdit from '@/components/modules/ExplainEdit'
import NameEdit from '@/components/modules/NameEdit'
import EditAvatar from '@/components/modules/EditAvatar'
import EditHeader from '@/components/modules/EditHeader'
import CustomSnackbar from '@/components/modules/CustomSnackbar'

export default function EditProfile({ user, logedUserCode, whichUserProfile }) {
  const [snackbarError, setSnackbarError] = useState(false)
  const [SnackbarMessage, setSnackbarMessage] = useState('محدودیت تعداد کارکتر را رعایت نمایید')
  const maxLengthError = parameter => {
    parameter && setSnackbarMessage(parameter)
    setSnackbarError(true)
  }
  return (
    <>
      <MyAppBar logedUserCode={logedUserCode} whichUserProfile={whichUserProfile} />
      <EditHeader user={user} />
      <EditAvatar user={user} />
      <NameEdit
        user={user}
        maxLengthError={maxLengthError}
        defaultValue={'پروفایل'}
        label={'نام و نشان'}
      />
      <BioEdit user={user} maxLengthError={maxLengthError} />
      <ExplainEdit user={user} maxLengthError={maxLengthError} />
      <CountactEdit user={user} maxLengthError={maxLengthError} />
      <CustomSnackbar
        open={snackbarError}
        onClose={() => setSnackbarError(false)}
        message={SnackbarMessage}
        severity="error"
      />
    </>
  )
}

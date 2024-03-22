import { Box, Typography } from "@mui/material"

export const mainTabYourReqText = `
هر چیزی لازم داری با زدن دکمه درخواست جدید اعلام کن هر چقدر کارهای
بیشتری از درخواست های دیگران انجام بدی دیگران هم درخواست های بیشتری برای
شما انجام خواهند داد
`
export const selectGuild = `
کسب و کاری که ثبت می کنید با چه صنفی مرتبط است؟

`
export const createBusiness_selectAsPrimary = () => {

    return <Box sx={{ py: 1, textAlign: "center" }}>
        <Typography>
            داشتن چند شغل و عضویت در چند کسب و کار مختلف تا سقف 3 عدد مجاز است اما محصولاتی که دریافت می کنید به حساب کسب و کار اصلی شما منظور می شود
        </Typography>
        <Typography>
            تغییر کسب و کار اصلی تنها هر 14 روز یکبار امکانپذیر است
        </Typography>
    </Box>
}



import React from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import RequestFrames from "./YourRequestFrames";

const YourReq = () => {
  return (
    <div align={"center"}>
      <Typography>
        هر چیزی لازم داری با زدن دکمه درخواست جدید اعلام کن هر چقدر کارهای
        بیشتری از درخواست های دیگران انجام بدی دیگران هم درخواست های بیشتری برای
        شما انجام خواهند داد
      </Typography>
      <Grid xs display="flex" justifyContent="center" alignItems="center">
        <Typography sx={{ m: 2 }} bgcolor="#cfd8dc">
          درخواست های تایید شده
        </Typography>
      </Grid>
      <Stack spacing={1}>
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
        <RequestFrames />
      </Stack>
      <Grid xs display="flex" justifyContent="center" alignItems="center">

      <Typography sx={{ m: 2}} bgcolor="#cfd8dc">
        درخواست های منتظر تایید
      </Typography>
      </Grid>
    </div>
  );
};

export default YourReq;

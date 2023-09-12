import React from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import OthersRequestFrames from "./OthersRequestFrames";

const OthersRequest = () => {
  return (
    <div>

      <Grid xs display="flex" justifyContent="right" alignItems="center" >
        <Typography className={"text-extrabold"} sx={{ m: 2 }}>
          درخواست هایی که تایید کردید
        </Typography>
      </Grid>


      <Stack spacing={1}>
        <OthersRequestFrames />
      </Stack>

      <Grid xs display="flex" justifyContent="center" alignItems="center">
      <Typography sx={{ m: 2}} bgcolor="#cfd8dc">
        درخواست هایی که درخواست اطلاعات بیشتر کردید
      </Typography>
      </Grid>

      <Grid xs display="flex" justifyContent="center" alignItems="center">
      <Typography sx={{ m: 2}} bgcolor="#cfd8dc">
        درخواست های منتظر تایید
      </Typography>
      </Grid>


     
    </div>
  );
};

export default OthersRequest;

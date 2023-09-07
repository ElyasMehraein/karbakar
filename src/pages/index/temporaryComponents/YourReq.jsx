import React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import { Box, Chip, Stack } from "@mui/material";

import RequestFrames from "./RequestFrames";

import businessAvatar2 from "../../../assets/businessAvatar2.jpg";
import businessAvatar from "../../../assets/businessAvatar.jpg";
import businessAvatar3 from "../../../assets/pars.jpg";
import "./YourReq.css";
import FixedBottomNavigation from "../FixedBottomNavigation";
const YourReq = () => {
  return (
    <div align={"center"}>
      <Typography>
        هر چیزی لازم داری با زدن دکمه درخواست جدید اعلام کن هر چقدر کارهای
        بیشتری از درخواست های دیگران انجام بدی دیگران هم درخواست های بیشتری برای
        شما انجام خواهند داد
      </Typography>

      <Typography sx={{ m: 2, width: "200px" }} bgcolor="#cfd8dc">
        درخواست های تایید شده
      </Typography>
      <Stack spacing={1}>
         <RequestFrames />
         <FixedBottomNavigation></FixedBottomNavigation>
      </Stack>
      <Typography sx={{ m: 2, width: "200px" }} bgcolor="#cfd8dc">
        درخواست های منتظر تایید
      </Typography>
      
    </div>
  );
};

export default YourReq;

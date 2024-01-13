import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Image from 'next/image'

import businessAvatar from "@/assets/businessAvatar.jpg";
import businessAvatar2 from "@/assets/businessAvatar2.jpg";
import businessAvatar3 from "@/assets/pars.jpg";
const YourRequestFrames = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            mr: 2
          }}
        >
          <Typography textAlign={"right"}>
            تعویض روغن ماشین
          </Typography>

          <Typography sx={{ mr: 1, fontSize: 12 }} dir="rtl" noWrap >
            ماشینم پراید هست فیلتر میخوام شیشه شور میخوام تنظیم باد هم میخوام
            روغن گیربکس هم باید عوض بشه ولی روغن رو خودم تهیه می کنم
          </Typography>
        </Box>
        <AvatarGroup dir="ltr" max={4} total={24}>
          <Avatar><Image src={businessAvatar} alt="karbakar website logo" sizes="auto" fill /></Avatar>
          <Avatar><Image src={businessAvatar2} alt="karbakar website logo" sizes="auto" fill /></Avatar>
          <Avatar><Image src={businessAvatar3} alt="karbakar website logo" sizes="auto" fill /></Avatar>
        </AvatarGroup>
      </Box>
    </div>
  );
};
export default YourRequestFrames;

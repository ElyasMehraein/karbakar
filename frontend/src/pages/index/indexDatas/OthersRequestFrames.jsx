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

import businessAvatar2 from "../../../assets/businessAvatar2.jpg";
import businessAvatar from "../../../assets/businessAvatar.jpg";
import businessAvatar3 from "../../../assets/pars.jpg";
const OthersRequestFrames = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        <Avatar alt="Remy Sharp" src={businessAvatar2} />
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            mr:2
          }}
        >
          <Typography textAlign={"right"}>
            کشاورزی ارگانیک زارع و خواهران
          </Typography>

          <Typography sx={{ mr: 1, fontSize: 12 }} dir="rtl" noWrap >
            ماشینم پراید هست فیلتر میخوام شیشه شور میخوام تنظیم باد هم میخوام
            روغن گیربکس هم باید عوض بشه ولی روغن رو خودم تهیه می کنم
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default OthersRequestFrames;

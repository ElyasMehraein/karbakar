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
import ItsAvatar from "@/components/modules/ItsAvatar";

const OthersRequestFrames = ({ request }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        <Avatar sx={{ width: 40, height: 40 }} >
          <ItsAvatar userCodeOrBusinessBrand={request.requesterBusiness.businessName} alt="workers avatar" />
        </Avatar>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            mr: 2
          }}
        >
          <Typography textAlign={"right"}>
            {request.title}
          </Typography>

          <Typography sx={{ mr: 1, fontSize: 12 }} dir="rtl" noWrap >
            {request.message}

          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default OthersRequestFrames;

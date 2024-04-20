import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ItsAvatar from "@/components/modules/ItsAvatar";
import ListItemButton from '@mui/material/ListItemButton';

const OthersRequestFrames = ({ request }) => {
  return (
    <List>
      <ListItem sx={{ m: 0, p: 0 }}>
        <ListItemButton sx={{ m: 0, p: 0 }}>
          <ListItemAvatar >
            <Avatar sx={{ width: 40, height: 40 }}>
              <ItsAvatar isAvatar={request.requesterBusiness.isAvatar} userCodeOrBusinessBrand={request.requesterBusiness.businessName} alt="workers avatar" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText align='right' primary={request.title} secondary={request.message} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
export default OthersRequestFrames;

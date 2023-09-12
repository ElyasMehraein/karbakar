import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import businessAvatar2 from "../../../assets/businessAvatar2.jpg";
import businessAvatar from "../../../assets/businessAvatar.jpg";
import businessAvatar3 from "../../../assets/pars.jpg";
const OthersRequestFrames = () => {
  return (
    <div>
      {/* <Grid
        container
        display={"flex"}
        sx={{
          flexGrow: 1,
          bgcolor: "#e3f2fd",
          border: "1px solid #64b5f6",
          borderRadius: "22px",
          height: 46,
          "&:hover": {
            backgroundColor: "#bbdefb",
          },
        }}
        variant="outlined"
        color="info"
      >
        <Grid
          xs="auto"
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar sx={{ ml: "2px" }} alt="Remy Sharp" src={businessAvatar} />
        </Grid>

        <Grid
          // container
          // direction="column"
          // justifyContent="flex-start"
          alignItems="flex-end"
          xs
          // bgcolor={"red"}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
            //  bgcolor={"blue"}
              sx={{ mr: 2 }} textAlign="left">
              تعویض روغن ماشین
            </Typography>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography
              textAlign="right"
              // bgcolor={"aqua"}
              sx={{ mr: 1, fontSize: 12 }}
              dir="rtl"
              noWrap
            >
              ماشینم پراید هست فیلتر میخوام شیشه شور میخوام تنظیم باد هم میخوام
              روغن گیربکس هم باید عوض بشه ولی روغن رو خودم تهیه می کنم
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}

      {/* material mui from here */}

      <List sx={{ width: "100%", maxWidth: 1200, bgcolor: "background.paper" }}>
        <ListItem dir="rtl">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={businessAvatar2} />
          </ListItemAvatar >
          <ListItemText  inset="true"
            
            primary="کشاورزی ارگانیک زارع و خواهران"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  تعویض روغن ماشین -
                </Typography>
                {
                  "ماشینم پراید هست فیلتر میخوام شیشه شور میخوام تنظیم باد هم میخوام روغن گیربکس هم باید عوض بشه ولی روغن رو خودم تهیه می کنم"
                }
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src={businessAvatar} />
          </ListItemAvatar>
          <ListItemText
            primary="تعمیرگاه هخامنش"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  تعویض روغن ماشین
                </Typography>
                {
                  " — ماشینم پراید هست فیلتر میخوام شیشه شور میخوام تنظیم باد هم میخوام روغن گیربکس هم باید عوض بشه ولی روغن رو خودم تهیه می کنم"
                }
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src={businessAvatar3} />
          </ListItemAvatar>
          <ListItemText
            primary="شرکت پارس خزر"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  تعویض روغن ماشین
                </Typography>
                {
                  "ماشینم پراید هست فیلتر میخوام شیشهماشینم پراید هست فیلتر میخوام شیشه شور میخوام تنظیم باد هم میخوام روغن گیربکس هم باید عوض بشه ولی روغن رو خودم تهیه می کن شور میخوام تنظیم باد هم میخوام روغن گیربکس هم باید عوض بشه ولی روغن رو خودم تهیه می کنم"
                }
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
};
export default OthersRequestFrames;

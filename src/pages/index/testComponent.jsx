import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import businessAvatar2 from "../../assets/businessAvatar2.jpg";
import businessAvatar from "../../assets/businessAvatar.jpg";
import businessAvatar3 from "../../assets/pars.jpg";
const RequestFrames = () => {
  return (
    <div>
      <Grid
        container
        sx={{
          flexGrow: 1,
          bgcolor: "#e3f2fd",
          border: "1px solid #64b5f6",
          borderRadius: "22px",
          height: 45,
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
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <AvatarGroup max={4} total={24}>
            <Avatar alt="Remy Sharp" src={businessAvatar} />
            <Avatar alt="Remy Sharp" src={businessAvatar2} />
            <Avatar alt="Remy Sharp" src={businessAvatar3} />
          </AvatarGroup>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
          xs
        >
          <Typography sx={{ mr: 2 }} textAlign="right">
            تعویض روغن ماشین
          </Typography>
          <Grid item xs zeroMinWidth>
            <Typography sx={{ mr: 1, fontSize: 10 }} dir="rtl" noWrap>
              ماشینم پراید هست فیلتر میخوام شیشه شور میخوام تنظیم باد هم میخوام
              روغن گیربکس هم باید عوض بشه ولی روغن رو خودم تهیه می کنم
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default RequestFrames;

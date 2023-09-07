import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import { Box } from "@mui/material";

import businessAvatar2 from "../../../assets/businessAvatar2.jpg";
import businessAvatar from "../../../assets/businessAvatar.jpg";
import businessAvatar3 from "../../../assets/pars.jpg";
import "./YourReq.css";
const RequestFrames = () => {
  return <div>

        <div className="majid"
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <AvatarGroup max={4} total={24}>
              <Avatar alt="Remy Sharp" src={businessAvatar} />
              <Avatar alt="Remy Sharp" src={businessAvatar2} />
              <Avatar alt="Remy Sharp" src={businessAvatar3} />
            </AvatarGroup>
          </Box>
          <Box
            sx={{
              // position: "relative",
              mr: 2,
              flexDirection: "column",
              display: "flex",
            }}
          >
            <Typography noWrap={true} 
            // sx={{ textAlign: "right" }}
            >
              تعویض روغن ماشین
            </Typography>
            <Typography
              // dir="rtl"
              // noWrap={true}
              sx={{
                // position: "relative",
                // textAlign: "right",
                fontSize: 10,
                width: "45vw",
              }}
            >
              ماشینم پراید هست روغن رو خودم تهیه می کنم
            </Typography>
          </Box>
        </div>
        
  </div>;
};
export default RequestFrames;

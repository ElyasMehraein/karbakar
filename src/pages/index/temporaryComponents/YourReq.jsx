import React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import { Box, Chip, Stack } from "@mui/material";

import businessAvatar2 from "../../../assets/businessAvatar2.jpg";
import businessAvatar from "../../../assets/businessAvatar.jpg";
import businessAvatar3 from "../../../assets/pars.jpg";
import "./YourReq.css";
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
        <Box
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
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#e3f2fd",
            border: "1px solid #64b5f6",
            borderRadius: "21px",
            height: 42,
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
          <Box sx={{ mr: 2, flexDirection: "column", display: "flex" }}>
            <Typography sx={{ textAlign: "right" }}>
              تعویض روغن ماشین
            </Typography>
            <Typography sx={{ fontSize: 10 }}>
              ماشینم پراید هست روغن رو خودم تهیه می کنم
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#e3f2fd",
            border: "1px solid #64b5f6",
            borderRadius: "21px",
            height: 42,
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
            <Avatar alt="Remy Sharp" src={businessAvatar} />
            <Avatar alt="Remy Sharp" src={businessAvatar2} />
          </Box>
          <Box sx={{ mr: 2, flexDirection: "column", display: "flex" }}>
            <Typography sx={{ textAlign: "right" }}>
              تعویض روغن ماشین
            </Typography>
            <Typography sx={{ fontSize: 10 }}>
              ماشینم پراید هست روغن رو خودم تهیه می کنم
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Typography sx={{ m: 2, width: "200px" }} bgcolor="#cfd8dc">
        درخواست های منتظر تایید
      </Typography>
      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#e3f2fd",
            border: "1px solid #64b5f6",
            borderRadius: "21px",
            height: 42,
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
          ></Box>
          <Box sx={{ mr: 2, flexDirection: "column", display: "flex" }}>
            <Typography sx={{ textAlign: "right" }}>
              تعویض روغن ماشین
            </Typography>
            <Typography sx={{ fontSize: 10 }}>
              ماشینم پراید هست روغن رو خودم تهیه می کنم
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#e3f2fd",
            border: "1px solid #64b5f6",
            borderRadius: "21px",
            height: 42,
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
          ></Box>
          <Box sx={{ mr: 2, flexDirection: "column", display: "flex" }}>
            <Typography sx={{ textAlign: "right" }}>
              تعویض روغن ماشین
            </Typography>
            <Typography sx={{ fontSize: 10 }}>
              ماشینم پراید هست روغن رو خودم تهیه می کنم
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#e3f2fd",
            border: "1px solid #64b5f6",
            borderRadius: "21px",
            height: 42,
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
          ></Box>
          <Box sx={{ mr: 2, flexDirection: "column", display: "flex" }}>
            <Typography sx={{ textAlign: "right" }}>
              تعویض روغن ماشین
            </Typography>
            <Typography sx={{ fontSize: 10 }}>
              ماشینم پراید هست روغن رو خودم تهیه می کنم
            </Typography>
          </Box>
        </Box>
      </Stack>
    </div>
  );
};

export default YourReq;

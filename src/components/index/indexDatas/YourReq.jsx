"user client"
import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
// import OthersRequestFrames from "./OthersRequestFrames";
import Typography from "@mui/material/Typography";
import YourRequestFrames from "./YourRequestFrames";


const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));


export default function YourReq() {

  return (
    <>
      <Divider textAlign="left">
        "درخواست های منتظر تایید"
      </Divider>
      <YourRequestFrames/>
      <Divider textAlign="left">
        "درخواست های تایید شده"
      </Divider>
    </>
  );
}

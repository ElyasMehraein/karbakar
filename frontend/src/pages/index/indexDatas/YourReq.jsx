import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import OthersRequestFrames from "./OthersRequestFrames";
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
    <Root>
      <Typography >
        هر چیزی لازم داری با زدن دکمه درخواست جدید اعلام کن هر چقدر کارهای
        بیشتری از درخواست های دیگران انجام بدی دیگران هم درخواست های بیشتری برای
        شما انجام خواهند داد
      </Typography>
      <YourRequestFrames/>
      <YourRequestFrames/>
      <Divider className={"text-extrabold"} textAlign="left">
      درخواست های منتظر تایید
      </Divider>
      <YourRequestFrames/>
      <YourRequestFrames/>
      <YourRequestFrames/>

    </Root>
  );
}

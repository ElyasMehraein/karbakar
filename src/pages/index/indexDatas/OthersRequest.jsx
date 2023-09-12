import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import OthersRequestFrames from "./OthersRequestFrames";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function DividerText() {
  return (
    <Root>
      <Divider className={"text-extrabold"} textAlign="left">
        درخواست هایی که تایید کردید
      </Divider>
      <OthersRequestFrames />
      <Divider className={"text-extrabold"} textAlign="left">
        درخواست هایی که درخواست اطلاعات بیشتر کردید
      </Divider>
      <OthersRequestFrames />
      <Divider className={"text-extrabold"} textAlign="left">
        درخواست های منتظر تایید
      </Divider>
      <OthersRequestFrames />
    </Root>
  );
}

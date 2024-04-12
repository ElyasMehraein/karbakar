import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import OthersRequestFrames from "./OthersRequestFrames";
import { useState } from "react";
import Guild from "@/components/modules/Guild";
import { useEffect } from "react";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function OthersRequest(distinctGuilds, user) {
  const [thisUser, setThisUser] = useState(user)

  useEffect(() => {
    setThisUser(user)
  },[thisUser]);

  console.log("user in OthersRequest", user, thisUser);

  const [guildname, setGuildName] = useState("")

  console.log("guildname", guildname);
  const updateGuildname = (newGuildname) => {
    setGuildName(newGuildname);
  };

  return (
    <Root>
      <Divider className={"text-extrabold"} textAlign="left">
        درخواست هایی که کسب و کار شما تایید کرده است
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
      {/* <Guild {...{ user:thisUser, updateGuildname, distinctGuilds }} /> */}

    </Root>
  );
}

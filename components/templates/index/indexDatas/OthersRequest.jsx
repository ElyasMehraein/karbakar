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

export default function OthersRequest({ user, distinctGuilds }) {

  const [defaultGuild, setDefaultGuild] = useState("")

  const updateGuildname = (newGuildname) => {
    setDefaultGuild(newGuildname);
  };

  return (
    <Root>
      {user?.businesses[0] && // بعدا با داکیومنت ریکوئست درستش کن
        <>
          <Divider sx={{ fontSize: '12px' }} className={"text-extrabold"} textAlign="left">
            درخواست هایی که کسب و کار شما تایید کرده است
          </Divider>
          
          {/* <OthersRequestFrames /> */}
          <Divider sx={{ fontSize: '12px' }} className={"text-extrabold"} textAlign="left">
            درخواست هایی که درخواست اطلاعات بیشتر کردید
          </Divider>
          {/* <OthersRequestFrames /> */}
          <Divider sx={{ fontSize: '12px' }} className={"text-extrabold"} textAlign="left">
            درخواست های منتظر تایید
          </Divider>
        </>
      }
      <Guild {...{ user, updateGuildname, distinctGuilds }} />
      
      {/* <OthersRequestFrames /> */}

    </Root>
  );
}

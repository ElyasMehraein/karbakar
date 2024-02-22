import UserModel from "@/models/User";
import React, { useState } from "react";

import { Box } from "@mui/material";
import SearchAppBar from "@/components/index/SearchAppBar";
import RightDrawer from "@/components/index/RightDrawer";
import Tabs from "@/components/index/Tabs";
import CssBaseline from "@mui/material";
import { verifyToken } from "@/controllers/auth";
import connectToDB from "@/configs/db";
import { useEffect } from "react";

function Index(props) {

  const [user, setUser] = useState(false);
  console.log("user in index is ", user);
  useEffect(() => {
    if (props.user) {
      setUser(props.user)
    }

  }, [user])

  const [open, setOpen] = useState(false);

  const menuClickHandler = () => {
    setOpen(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      {console.log(user)}
      {user ?
        <h3 dir="ltr">you are logging with following personal code {user.code} you are logging with following token {props.token}</h3> : <h3 dir="ltr">you are not loged in</h3>
      }
      <RightDrawer user={user} open={open} handleDrawerClose={handleDrawerClose} />
      <SearchAppBar user={user} menuClickHandler={menuClickHandler} />
      <Tabs user={user} />

    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const tokenPayLoad = verifyToken(token)
  connectToDB()
  const user = await UserModel.findOne(
    { _id: tokenPayLoad.id },
    "-_id code"
  )
  if (!token || !tokenPayLoad) {
    console.log("there is no valid token");
    return {
      props: { tokenPayLoad }
    }
  } else {
    console.log("there is a valid token");
    console.log(user);
    return {
      props: { user: JSON.parse(JSON.stringify(user)), token }
    }
  }
}

export default Index;
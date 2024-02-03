import React, { useState } from "react";
import { Box } from "@mui/material";
import SearchAppBar from "@/components/index/SearchAppBar";
import RightDrawer from "@/components/index/RightDrawer";
import Tabs from "@/components/index/Tabs";
import CssBaseline from "@mui/material";
import { verifyToken } from "@/controllers/auth";

function Index() {
  const [open, setOpen] = React.useState(false);

  const menuClickHandler = () => {
    setOpen(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>

      <RightDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <SearchAppBar menuClickHandler={menuClickHandler} />
      <Tabs />

    </>
  );
}
// export async function getServerSideProps(context) {
//   const { token } = context.req.cookies;
//   if (!token) {

//     return console.log("login nisty");
//   }
//   const isValidToken = verifyToken(token)
//   console.log(isValidToken);

//   if (!isValidToken) {
//     return console.log("bazam login nisty");

//   }
//   return {
//     props: {}
//   }


// }
export default Index;
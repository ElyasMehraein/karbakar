import React from "react";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material";

const Test = () => {
    const theme = useTheme()
    console.log(theme)
    return <Box />
}

export default Test
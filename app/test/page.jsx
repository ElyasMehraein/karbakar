"use client"
import React from "react";
import Button from "@mui/material/Button";
import { triggerSnackbar } from "@/utils/snackbarService";

// const onClose = () => {
//     console.log("zahre mar");

// }

const ExampleComponent = () => {
    return (
        <div>
            <Button onClick={() => triggerSnackbar(" موفقیت‌آمیز   ", "error")} variant="contained" color="primary">
                نمایش اسنک‌ بار
            </Button>
        </div>
    );
};

export default ExampleComponent;

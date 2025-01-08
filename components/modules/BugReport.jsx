"use client";
import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import CustomSnackbar from "@/components/modules/CustomSnackbar";

export default function BugReport() {
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState("");

    const handleSubmit = async () => {
        setMessage("");
        if (!description.trim()) {
            setMessage("توضیح خالی است");
            return;
        }
        if (description.length > 150) {
            setMessage("حداکثر ۱۵۰ کاراکتر مجاز است");
            return;
        }
        try {
            const res = await fetch("/api/Bug/bugReport", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description }),
            });
            const data = await res.json();
            if (data.success) {
                setOpen(true)
                setMessage("ثبت شد");
                setDescription("");
            } else {
                setMessage(`خطا: ${data.error}`);
            }
        } catch {
            setMessage("خطا در ارتباط با سرور");
        }
    };

    return (
        <Container className="inMiddle">
            <Box width={"100%"} sx={{ my: 1, display: "flex", flexDirection: "row", gap: 1 }}>
                <Typography fontSize={11}>گزارش باگ</Typography>
                <TextField
                    label="توضیح باگ (حداکثر ۱۵۰ کاراکتر)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 150))}
                    size="small"
                    fullWidth
                    sx={{
                        "& .MuiInputBase-input": {
                            fontSize: 12
                        },
                        "& .MuiFormLabel-root": {
                            fontSize: 12
                        }
                    }}
                />
                <Button size="small"
                    variant="contained" onClick={handleSubmit}>
                    ارسال
                </Button>
                <CustomSnackbar
                    open={open}
                    message={message}
                />
            </Box>
        </Container>
    );
}

"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

export default function BugShow({user}) {
  const [bugReports, setBugReports] = useState([]);
  const [error, setError] = useState("");

  const fetchBugs = async () => {
    try {
      const res = await fetch("/api/Bug/getBugs");
      const data = await res.json();
      if (data.success) {
        setBugReports(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("خطا در واکشی گزارش‌ها");
    }
  };

  const deleteBug = async (id) => {
    try {
      if (user.code > 1004) {
        alert("مگه تو ادمینی که پاک می کنی؟ 😀")
        return
      }
      const res = await fetch(`/api/Bug/bugDelete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBugReports((prev) => prev.filter((b) => b._id !== id));
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("خطا در حذف گزارش");
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">گزارش‌های باگ</Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {bugReports.map((bug) => (
        <Box
          key={bug._id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 2,
            p: 2,
            mb: 1,
          }}
        >
          <Box>
            <Typography>متن: {bug.description}</Typography>
            <Typography>کد کاربر: {bug.sender || "نامشخص"}</Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteBug(bug._id)}
          >
            حذف
          </Button>
        </Box>
      ))}
    </Box>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Box, ListItemIcon } from "@mui/material";

export default function ItsAvatar({ userCodeOrBusinessBrand, sx }) {
  const avatarUrl = `/api/images/avatars/${userCodeOrBusinessBrand}.jpg`;
  const [isLoading, setIsLoading] = useState(true);
  const [errorDBUrl, setErrorDBUrl] = useState(true);

  useEffect(() => {
    // بررسی وجود تصویر
    const checkImage = async () => {
      try {
        const res = await fetch(avatarUrl, { method: "HEAD" }); // فقط هدرها را دریافت می‌کنیم
        const imageExists = res.headers.get("X-Image-Exists") !== "false";
        setErrorDBUrl(!imageExists)
      } catch (err) {
        console.error("Error checking image:", err);
        setErrorDBUrl(true);
      }
    };
    checkImage();
    setIsLoading(false)
  }, [avatarUrl]);

  if (errorDBUrl || isLoading) {
    return (
      isNaN(userCodeOrBusinessBrand) ? (
        <Avatar sx={sx ? sx : { width: 40, height: 40 }}>
          <ListItemIcon
            style={{ display: "grid", placeItems: "center" }}
          >
            <BusinessIcon />
          </ListItemIcon>
        </Avatar>
      ) : (
        <Avatar sx={sx ? sx : { width: 40, height: 40 }}>
          <AccountCircle />
        </Avatar>
      )
    )
  } else {
    return (
      <Avatar sx={sx}>
        <Image
          style={{ objectFit: "cover" }}
          src={avatarUrl}
          alt={userCodeOrBusinessBrand}
          quality={100}
          fill
          sizes="100px"
          onError={() => setErrorDBUrl(true)}
        />
      </Avatar>
    )
  }
}
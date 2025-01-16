"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Box, ListItemIcon } from "@mui/material";

export default function ItsAvatar({ userCodeOrBusinessBrand }) {
  const avatarUrl = `/api/images/avatars/${userCodeOrBusinessBrand}.jpg`;
  const [isLoading, setIsLoading] = useState(true);
  const [errorDBUrl, setErrorDBUrl] = useState(false);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return errorDBUrl && !isLoading ? (
    isNaN(userCodeOrBusinessBrand) ? (
      <ListItemIcon style={{ display: "grid", placeItems: "center" }}>
        <BusinessIcon />
      </ListItemIcon>
    ) : (
      <AccountCircle sx={{ width: 30, height: 30 }} />
    )
  ) : (
    <Image
      style={{ objectFit: "cover" }}
      src={avatarUrl}
      alt={userCodeOrBusinessBrand}
      quality={100}
      fill
      sizes="100px"
      onError={() => setErrorDBUrl(true)}
    />
  );
}

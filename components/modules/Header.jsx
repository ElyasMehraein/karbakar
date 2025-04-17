"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DefaultHeader from "@/public/assets/default/DefaultHeader";

export default function Header({ user, business }) {
  const [errorDBUrl, setErrorDBUrl] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [headerUrl, setHeaderUrl] = useState(
    user?.headerUrl || business?.headerUrl
  );
  const userCodeOrBusinessBrand = user?.code || business?.businessName;

  useEffect(() => {
    setHeaderUrl(
      `/api/images/headers/${userCodeOrBusinessBrand}.jpg?timestamp=${new Date().getTime()}`
    );
    setIsLoading(false);
  }, []);


  useEffect(() => {
    const checkImage = async () => {
      try {
        const res = await fetch(headerUrl, { method: "HEAD" }); // فقط هدرها را دریافت می‌کنیم
        const imageExists = res.headers.get("X-Image-Exists") !== "false";
        setErrorDBUrl(!imageExists)
      } catch (err) {
        console.error("Error checking image:", err);
        setErrorDBUrl(true);
      }
    };
    checkImage();
    setIsLoading(false)
  }, [headerUrl]);

  if (headerUrl && !errorDBUrl && !isLoading) {

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "50vh",
        }}
      >
        <Image
          alt={`${userCodeOrBusinessBrand} header`}
          src={headerUrl}
          priority
          quality={200}
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    )
  } else {
    return (
      <DefaultHeader />
    )
  }
}

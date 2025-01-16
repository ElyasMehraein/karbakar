"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import DefaultHeader from "@/public/assets/default/DefaultHeader";

export default function Header({ user, business }) {
  const [errorDBUrl, setErrorDBUrl] = useState(false)


  const [headerUrl, setHeaderUrl] = useState(user?.headerUrl || business?.headerUrl)
  const userCodeOrBusinessBrand = user?.code || business?.businessName;

  useEffect(() => {
    setHeaderUrl(`/api/images/Headers/${userCodeOrBusinessBrand}.jpg?timestamp=${new Date().getTime()}`);
  }, []);

  return (
    headerUrl && !errorDBUrl ? (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "50vh",
        }}>
        <Image
          alt={`${userCodeOrBusinessBrand} header`}
          src={headerUrl}
          priority
          quality={100}
          fill
          sizes="100%"
          style={{
            objectFit: 'cover',
          }}
          onError={() => setErrorDBUrl(true)}

        />
      </div>
    ) : (
      <DefaultHeader />
    )
  );
}

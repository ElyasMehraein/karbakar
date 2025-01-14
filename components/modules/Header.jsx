"use client"
import Image from 'next/image';
import * as React from 'react';
import DefaultHeader from "@/public/assets/default/DefaultHeader";
import { useState, useEffect } from 'react';

export default function Header({ user, business }) {

  const userCodeOrBusinessBrand = user?.code || business?.businessName;
  const [isLoading, setIsLoading] = useState(true);
  const [isHeader, setIsHeader] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true); // اصلاح وضعیت لودینگ
          try {
              const res = await fetch('/api/isHeaderAvalable', {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ userCodeOrBusinessBrand })
              });
              if (res.ok) {
                  const { isHeader } = await res.json();
                  setIsHeader(isHeader);
              } else {
                  console.error("خطا در دریافت داده‌ها");
              }
          } catch (error) {
              console.error("خطای شبکه:", error);
          } finally {
              setIsLoading(false); // توقف لودینگ پس از اتمام فراخوانی
          }
      };
      fetchData();
  }, [userCodeOrBusinessBrand]); // اضافه کردن به آرایه وابستگی‌ها

  const headerImage = `images/headers/${userCodeOrBusinessBrand}.jpg`;

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isHeader ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "50vh",
          }}>
          <Image
            alt={`${userCodeOrBusinessBrand} header`}
            src={headerImage}
            priority
            quality={100}
            fill
            sizes="100%"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      ) : (
        <DefaultHeader />
      )}
    </div>
  );
}

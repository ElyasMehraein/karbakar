"use client"
import Image from 'next/image';
import * as React from 'react';
import DefaultHeader from "@/public/assets/default/DefaultHeader"
import { useState } from 'react';
import { useEffect } from 'react';

export default function Header({ user, business }) {

  const userCodeOrBusinessBrand = user?.code || business?.businessName
  const [imageKey, setImageKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const headerImage = `/headers/${user?.code || business?.businessName}.jpg${imageKey ? `?key=${imageKey}` : ''}`
  useEffect(() => {
    setImageKey(Date.now());
    setIsLoading(true)

  }, []);

  return (
    <div>
      {(isLoading && headerImage) ? (
        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "50vh",
          }}>
          <Image
            alt={`${userCodeOrBusinessBrand} header`}
            src={headerImage}
            priority
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      ) :
        <DefaultHeader />
      }
    </div>
  )
}

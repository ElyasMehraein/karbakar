import Image from 'next/image';
import * as React from 'react';
import DefaultHeader from "@/public/assets/default/DefaultHeader"


export default function Header({ user, business }) {
  const userCodeOrBusinessBrand = user?.code || business?.businessName
  const isUserprofileHeaderExist = user?.header || business?.header
  return (
    <div>
      {isUserprofileHeaderExist ? (
        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "40vh",
          }}>
          <Image
            alt={`${userCodeOrBusinessBrand} header`}
            src={`/headers/${userCodeOrBusinessBrand}.jpg`}
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

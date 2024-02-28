import Image from 'next/image';
import * as React from 'react';
import DefaultHeader from "@/public/assets/default/DefaultHeader"


export default function Header({ user, business }) {
  const userCodeOrBusinessBrand = user?.code || business?.businessName
  const isUserprofileHeaderExist = user?.header || business?.header
  if(isUserprofileHeaderExist){
    console.log(`toye header true /headers/${userCodeOrBusinessBrand}.jpg`);
  }else{
    console.log("toye header false ");
  }
  return (
    <div>

      {isUserprofileHeaderExist ? (
        <div
          style={{
            // use relative position for the parent div
            position: "relative",
            width: "100vw",
            height: "40vh",
          }}>
          <Image
            alt={`${userCodeOrBusinessBrand} header`}
            src={`/headers/${userCodeOrBusinessBrand}.jpg`}
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

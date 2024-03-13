import React from 'react'
import Wellcome from '@/components/templates/welcome/welcome';
import { verifyToken } from "@/controllers/auth";
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";

export default async function page() {
  const token = cookies().get("token")?.value;
  if (!token) {
    return (
      <Wellcome />
    )
  }
  const tokenPayLoad = verifyToken(token);
  if (tokenPayLoad) {
    redirect('/')
  }


}


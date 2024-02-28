import React from 'react'
import Wellcome from '@/components/welcome/welcome';
import { verifyToken } from "@/controllers/auth";
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";

export default async function page() {
  const token = cookies().get("token")?.value;
  const tokenPayLoad = verifyToken(token);
  if (tokenPayLoad) {
    redirect('/')
  }

  return (
    <Wellcome />
  )
}

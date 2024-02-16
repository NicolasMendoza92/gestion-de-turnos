
import RegisterForm from '@/components/forms/RegisterForm';
import { useSession } from 'next-auth/react';
import React from 'react'
import NavbarAdmin from './admin/NavbarAdmin';

export default function Register() {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user.email === 'admin@gmail.com' ? (
        <>
          <NavbarAdmin />
          <RegisterForm />
        </>

      ) :
        <div className="flex justify-center m-auto shadow-md p-3 bg-zince-300/10 flex items-center gap-2">
          <h1>Only the admin can create users</h1>
        </div>
      }
    </div>
  )
}
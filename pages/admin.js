
import LoginForm from '@/components/forms/LoginForm'
import { useSession } from 'next-auth/react';
import React from 'react'
import NavbarAdmin from './admin/NavbarAdmin';
import { TableReserves } from '@/components/adminComponents/TableReserves';

export default function AdminPage() {

    const { data: session } = useSession();

    return (
        <>
            {!session &&
                <LoginForm />
            }
            {session &&
            <>
            <NavbarAdmin/>
                <TableReserves/>
            </>
                
            }
        </>
    )
}

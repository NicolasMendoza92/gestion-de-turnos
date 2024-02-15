
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import Swal from 'sweetalert2';

export default function RegisterForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    // handle errors 
    const [error, setError] = useState("");

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('completa campos');
            return;
        }
        //  ANTES HAGO QUE VERIFIQUE EL EMIAL
        try {
            const res = await fetch('api/userExists', {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
            });

            //  VALIDAMOS USUARIO
            const {userfind} = await res.json();
            if (userfind) {
                setError('Usuario existente');
                return;
            }

            const response = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if(response.ok){
                Swal.fire({
                    icon: "success",
                    title: "Usuario creado",
                    showConfirmButton: false,
                    timer: 1500
                });
                const form = e.target;
                router.push("/admin")
                form.reset();
            } else{
                console.log('Registro fallido')
            }
        } catch (error) {
            console.log('Error', error)
        }
    }



    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-primary">
                <h1 className="text-xl font-bold my-4">Registra un nuevo Admin</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="bg-primary text-white font-bold cursor-pointer px-6 py-2">
                        Register
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link className="text-sm mt-3 text-right" href={"/"}>
                        Already have an account? <span className="underline hover:text-primary">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}

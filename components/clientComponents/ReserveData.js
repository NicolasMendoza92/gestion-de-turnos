import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import Spinner from '../Spinner';

export default function ReserveData({ _id, fullName, cita, email }) {

    const router = useRouter()
    const [status, setStatus] = useState('cancelado');
    const [isLoading, setIsLoading] = useState(false);



    const cancelarReserva = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await axios.put('/api/reserves', { status, _id })
            Swal.fire({
                title: "Gestionado",
                text: "Su reserva ha sido cancelada",
                icon: "success"
            });
            await axios.post('/api/cancelEmail', { fullName, cita, email })
            router.push('/')
        } catch (error) {
            console.log(error)
        }

    }

    const conservarReserva = () => {
        Swal.fire({
            title: "Excelente",
            text: "Te esperamos",
            icon: "success"
        });
        router.back();
    }



    return (
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-gray-200'>
            <h1 className='text-3xl text-bold text-center'>Datos de tu cita</h1>
            <div className='p-2 mb-3'>
                <p className='text-xl'>Nombre: {fullName}</p>
                <p className='text-xl'>Contacto: {email}</p>
                <p className='text-xl'>Cita: {cita}</p>
            </div>

            <hr />
            <div className='flex justify-between p-2 mt-3'>
                <button className='px-1 py-1 bg-green-600 text-white' onClick={conservarReserva}> Conservar cita</button>
                <form onSubmit={cancelarReserva}>
                    <input
                        type='hidden'
                        value='cancelado'
                        onChange={e => setStatus(e.target.value)} />
                    <button type='submit' className='px-1 py-1 bg-red-400 text-white'> Cancelar cita</button>
                </form>
            </div>
            {isLoading && (
                <div className="flex flex-col justify-center">
                    <h1 className='text-2xl text-white'>Realizando petición</h1>
                    <Spinner />
                </div>
            )}
        </div>
    )
}

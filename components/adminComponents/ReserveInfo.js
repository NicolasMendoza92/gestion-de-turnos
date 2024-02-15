import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import Spinner from '../Spinner';

export default function ReserveInfo({ _id, fullName, cita, email, createdAt, status }) {

    const router = useRouter()
    const [statusChange, setStatusChange] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const cancelarReserva = async (e) => {
        e.preventDefault();
        try {
            if (statusChange === "") {
                return
            } else {
                setIsLoading(true);
                await axios.put('/api/reserves', { status: statusChange, _id })
                Swal.fire({
                    title: "Gestionado",
                    text: `La reserva de ${fullName} ha sido cancelada`,
                    icon: "success"
                });
                await axios.post('/api/cancelReserveEmail', { fullName, cita, email })
                router.push('/admin')
            }

        } catch (error) {
            console.log(error)
        }

    }

    const vovler = () => {
        router.back();
    }



    return (
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-gray-200'>
            <h1 className='text-3xl text-bold text-center'>Datos de la reserva</h1>
            <div className='p-2 mb-3'>
                <p className='text-xl'>Nombre: <b>{fullName}</b> </p>
                <p className='text-xl'>Correo electrónico:  <b>{email}</b></p>
                <p className='text-xl'>Cita para el:  <b>{cita}</b></p>

                <p className='text-xl'>Status:{status === "cancelada" ? <b className='text-red-500'>{status}</b> 
                : <b className='text-green-500'>{status}</b>}
                </p>
                <p className='text-xl'>Solicitada el: <b>{(new Date(createdAt)).toLocaleString(
                    "GB-English", { dateStyle: "short" }
                )}</b></p>
            </div>

            <hr />
            <div className='flex justify-between p-2 mt-3'>
                <button className='px-1 py-1 bg-gray-600 text-white' onClick={vovler}>Volver a la tabla</button>
                <form className='flex flex-col gap-2' onSubmit={cancelarReserva}>
                    <select
                        className=" px-6 py-2 border rounded-md w-full"
                        onChange={(e) => setStatusChange(e.target.value)}>
                        <option value="">-select-</option>
                        <option value="cancelada">Cancelar cita</option>
                    </select>
                    <button type='submit' className='px-1 py-1 bg-red-400 text-white'> Confirmar cambio</button>
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

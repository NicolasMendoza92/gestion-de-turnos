import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import 'moment/locale/es';
import Swal from 'sweetalert2';
import axios from 'axios';
import Spinner from '../Spinner';

export default function ReservaForm() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    // handle errors 
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    moment.locale('es');

    const handleDateChange = (selectedDate) => {
        const selectedDay = new Date(selectedDate).getDay();
    
        // 0 representa el domingo en la fecha de JavaScript
        if (selectedDay === 0) {
            Swal.fire({
                title: "Atención",
                text: "Domingos no atendmos, selecciona otra fecha.",
                icon: "warning"
              });
            setDate(null);
        } else {
            setDate(selectedDate);
        }
    };
    

      const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()+ 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const disableMaxDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 21);
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !time || !date) {
            setError('completa campos');
            return;
        }
        //  ANTES HAGO QUE VERIFIQUE EL EMIAL
        try {
            setIsLoading(true);

            const cita = moment(date).format('dddd') + ',' + moment(date).format('DD-MM') + ' de ' + time;
            const newEmail = {
                fullName,
                email,
                cita,
                solicitado: new Date().toLocaleString(
                    "es-ES",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }
            const res = await fetch('api/reserveExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cita }),
            });

            //  VALIDAMOS RESERVA
            const { reservado } = await res.json();
            if (reservado) {
                setError('Horario ocupado');
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Parece que el horario que elegiste esta ocupado, intenta nuevamente con uno distitno.",
                    footer: 'Cualquier cosa comunicate con nosotros al <a href="https://wa.me/c/34644053023">WhatsApp</a>'
                });
                setIsLoading(false);
                return;
            }
            if (!reservado) {
                const response = await fetch('api/reserves', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fullName, email, date, time, cita
                    })
                })

                if (response.ok) {
                    await axios.post('/api/confirmationEmail', newEmail);
                    Swal.fire({
                        title: "Reservado",
                        text: "Te enviaremos un correo con la información",
                        icon: "success"
                    });   
                    const form = e.target;  
                    setError('');
                    setFullName('');
                    setEmail('');
                    form.reset();
                } else {
                    console.log('Reserva fallida')
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.log('Error', error)
        }
    }



    return (
        <div className=''>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 p-8">
                <label className='text-xl text-white'>Nombre y Apellido</label>
                <input
                    className="rounded-md"
                    type="text"
                    maxLength={80}
                    placeholder="Lio Messi"
                    onChange={(e) => setFullName(e.target.value)} />

                <label className='text-xl text-white'>Correo electronico</label>
                <input
                    className="rounded-md"
                    type="email"
                    maxLength={70}
                    placeholder="test@mail.com"
                    onChange={(e) => setEmail(e.target.value)} />

                <label className='text-xl text-white'>Selecciona el día</label>
                <input
                    type="date"
                    className=" rounded-md"
                    name='selectDate'
                    min={disablePastDate()}
                    max={disableMaxDate()}
                    value={date || ''}
                    onChange={(e) => handleDateChange(e.target.value)} />
                <label className='text-xl text-white'>Selecciona el horario</label>
                <select
                    className=" px-6 py-2 rounded-md w-full"
                    onChange={(e) => setTime(e.target.value)}>
                    <option value="">-no seleccionado-</option>
                    <option value="11:00 a 12:00">11:00 a 12:00</option>
                    <option value="12:00 a 13:00">12:00 a 13:00</option>
                    <option value="15:00 a 16:00">15:00 a 16:00</option>
                    <option value="16:00 a 17:00">16:00 a 17:00</option>
                    <option value="17:00 a 18:00">17:00 a 18:00</option>
                    <option value="18:00 a 19:00">18:00 a 19:00</option>
                    <option value="19:00 a 20:00">19:00 a 20:00</option>
                    <option value="20:00 a 21:00">20:00 a 21:00</option>
                </select>
                <button className="bg-primary text-white text-center w-full py-4 px-4 flex gap-3 items-center justify-center rounded-md">
                    Solicitar reserva
                </button>

                {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}
                {isLoading && (
                    <div className="flex flex-col justify-center">
                        <h1 className='text-2xl text-white'>Consultando disponibilidad</h1>
                        <Spinner />
                    </div>
                )}
            </form>
        </div>
    )
}
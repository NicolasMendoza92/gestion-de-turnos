
import BigCalendar from '@/components/adminComponents/BigCalendar';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavbarAdmin from './NavbarAdmin';

export default function CalendarioPage() {

    const [allevents, setAllevents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        getAllEvents();
    }, [])

    async function getAllEvents() {
        setIsLoading(true)
        await axios.get('/api/events').then(res => {
            setAllevents(res.data.events)
        })
        setIsLoading(false)
    }

    return (
        <div>
            <NavbarAdmin/>
            <h1 className='text-2xl'> Calendario</h1>
            <BigCalendar allevents={allevents} getAllEvents={getAllEvents} />
        </div>
    )
}
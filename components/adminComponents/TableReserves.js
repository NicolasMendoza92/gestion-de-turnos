import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import Swal from "sweetalert2";


export const TableReserves = () => {

    // creo states para guardar todas las operaciones 
    const [allreserves, setAllreserves] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getAllReserves();
    }, [])

    async function getAllReserves() {
        setIsLoading(true)
        await axios.get('/api/reserves').then(res => {
            setAllreserves(res.data.reserveDoc)
        })
        setIsLoading(false)
    };

    async function addToCalendar(_id) {
        setIsLoading(true);
        const result = await axios.get('/api/reserves?id=' + _id);
        const reservaElegida = result?.data;
        const fecha = (reservaElegida.date).slice(0, 11);
        const horas = reservaElegida.time.split('a').map(item => item.trim());
        const start = `${fecha}${horas[0]}:00.000+00:00`
        const end = `${fecha}${horas[1]}:00.000+00:00`
        const title = `${reservaElegida.fullName} de ${reservaElegida.time}`;


        Swal.fire({
            title: `¿Desea agregar la reserva de ${title} al calendario?`,
            showDenyButton: true,
            confirmButtonText: "Añadir",
            denyButtonText: `Dejar solo en tabla`
        }).then(async result => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                createEvent({ title, start, end, _id });
            } else if (result.isDenied) {
                Swal.fire("La reserva no se modifico ", "", "info");
            }
        });

        setIsLoading(false);

    }

    async function getInfoToDelete(_id) {

        setIsLoading(true);
        // Busco los eventos generados 
        const result = await axios.get('/api/events');
        const eventos = result?.data.events;
        // traigo el id del evento relacionado a la reserva
        const eventId = (eventos?.find((ev) => ev.reserve === _id))._id

        Swal.fire({
            title: "¿Esta seguro de eliminar esa reserva?",
            text: "Eliminar la reserva no indica al cliente que ya no esta disponible, para eso debera cancelar reserva",
            showDenyButton: true,
            confirmButtonText: "Borrar",
            denyButtonText: `No borrar`,
            confirmButtonColor: "#d33",
            denyButtonColor: "#3085d6",
        }).then(async result => {
            if (result.isConfirmed) {
                // llamo a la funcion borrar reserva y le paso los parametros
                deleteReserve({ _id, eventId })
            } else if (result.isDenied) {
                Swal.fire("La reserva continua ", "", "info");
            }
        });
    }

    async function deleteReserve({ _id, eventId }) {

        try {
            await axios.delete('/api/reserves?id=' + _id);
            await axios.delete('/api/events?id=' + eventId);
            Swal.fire("Borrado!", "", "success");
            getAllReserves();
        } catch (error) {
            console.log(error);
        }
    }

    const createEvent = async ({ title, start, end, _id }) => {
        try {
            const newEvent = { title, start, end, reserve: _id }
            const result = await axios.post('/api/events', newEvent);
            if (result.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Reserva agregada al calendario",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                alert('Algo paso')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const goToEditReserve = (_id) => {
        router.push('/edit/reserve/' + _id)
    }

    const columns = [
        {
            name: '_id',
            options: {
                filter: false,
                display: 'false',
            },
        },
        {
            name: 'fullName',
            label: 'Nombre',
        },
        {
            name: 'email',
            label: 'Email',
        },
        {
            name: 'cita',
            label: 'Cita',
        },
        {
            name: 'status',
            label: 'Status',
        },
        {
            name: 'date',
            label: 'fecha',
            options: {
                filter: false,
                customBodyRender: (value) => (
                    new Date(value).toLocaleString(
                        "es-ES",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    )
                ),
            },
        },
        {
            name: 'time',
            options: {
                filter: true,
                display: 'false',
            },
        },
        {
            name: "Action",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => (
                    <>
                        <div className="flex p-5">
                            <div className="group relative w-max">
                                <button
                                    className="hover:text-primary"
                                    onClick={() => addToCalendar(tableMeta.rowData[0], value)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>
                                </button>
                                <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                    Añadir al calendario
                                </span>
                            </div>
                            <div className="group relative w-max">
                                <button
                                    className="hover:text-primary"
                                    onClick={() => goToEditReserve(tableMeta.rowData[0], value)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </button>
                                <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                    Editar
                                </span>
                            </div>
                            <div className="group relative w-max">
                                <button
                                    className="hover:text-primary"
                                    onClick={() => getInfoToDelete(tableMeta.rowData[0], value)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                                <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                    Borrar
                                </span>
                            </div>
                        </div>

                    </>
                ),
            },
        },
    ]

    const options = {
        filterType: 'multiselect',
        selectableRows: 'none', 
        responsive: 'simple', 
        searchOpen: false, 
    };

    return (
        <>
            {isLoading && (
                <div className="w-full flex justify-center py-4">
                    <Spinner />
                </div>
            )}
            <div style={{ height: '100vh' }} >
            <MUIDataTable
                title={"RESERVAS"}
                data={allreserves}
                columns={columns}
                options={options}
            />
            </div>
            
        </>

    )
}
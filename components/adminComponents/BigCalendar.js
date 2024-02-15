import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Swal from 'sweetalert2';
import 'moment/locale/es';
moment.locale('es');

export default function BigCalendar({ allevents, getAllEvents }) {

  const router = useRouter();

  function deleteEvent(event) {
    
    try {
      Swal.fire({
        icon: "info",
        text: `¿Borramos esta reserva?`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar!',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      }).then(async result => {
        // hacemos console log del result y vemos que opcion es cada una. 
        if (result.isConfirmed) {
            await axios.delete('/api/events?id=' + event._id);
            await axios.delete('/api/reserves?id=' + event.reserve);
            getAllEvents();
        }
      });

    } catch (error) {
      console.log(error)
    }

  }

  const localizer = momentLocalizer(moment);
  return (
    <div className='mt-5' style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        onDoubleClickEvent={(event) => deleteEvent(event)}
        events={allevents}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'agenda']}
      />

    </div>
  )
}
'use client'; 
import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { supabase } from '@/lib/supabase';

// Configuración de Moment
const localizer = momentLocalizer(moment);

interface ReservationEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resourceId: number;
}

export default function ConferenceCalendar() {
  const resources = [
    { id: 1, title: 'Sala de Conferencia Nivel 9' },
    { id: 2, title: 'Sala de Conferencia Nivel 14' },
  ];
  
  const [events, setEvents] = useState<ReservationEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de navegación y vista
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('day');

  // --- FUNCIÓN PARA BORRAR RESERVAS DE SUPABASE ---
  const deleteReservation = async (reservationId: number, title: string) => {
    // Pedimos confirmación al usuario
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas CANCELAR la reserva de ${title}?`);
    
    if (confirmDelete) {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', reservationId); // Borra el registro que coincida con el ID

      if (error) {
        alert('Hubo un error al cancelar la reserva. Revisa la consola.');
        console.error(error);
      } else {
        // Si se borró, actualizamos la lista de eventos para que desaparezca del calendario
        fetchReservations(); 
        alert(`Reserva cancelada exitosamente.`);
      }
    }
  };

  // 1. LEER RESERVAS
  const fetchReservations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reservations')
      .select('id, supervisor_name, start_time, end_time, resource_id')
      .eq('type', 'conference');

    if (error) {
      console.error('Error:', error);
      setLoading(false);
      return;
    }

    const fetchedEvents: ReservationEvent[] = data.map(item => ({
      id: item.id,
      title: item.supervisor_name, 
      start: new Date(item.start_time),
      end: new Date(item.end_time),
      resourceId: item.resource_id,
    }));
    
    setEvents(fetchedEvents);
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, []);
  
  // --- MANEJAR CLIC EN UN EVENTO EXISTENTE ---
  const handleSelectEvent = (event: ReservationEvent) => {
    const startHour = moment(event.start).format('HH:mm');
    const endHour = moment(event.end).format('HH:mm');
    const resource = resources.find(r => r.id === event.resourceId)?.title || `Sala ${event.resourceId}`;

    // Le damos la opción de cancelar
    const action = window.prompt(
      `DETALLES DE RESERVA:\n` +
      `Sala: ${resource}\n` +
      `Supervisor: ${event.title}\n` +
      `Horario: ${startHour} a ${endHour}\n\n` +
      `Escribe 'CANCELAR' para eliminar esta reserva:`
    );

    if (action && action.toUpperCase() === 'CANCELAR') {
      deleteReservation(event.id, event.title);
    }
  };


  // 2. GUARDAR RESERVA O NAVEGAR (Sin cambios en esta lógica)
  const handleSelectSlot = async ({ start, end, resourceId }: any) => {
    
    if (view === 'month') {
      setDate(start); 
      setView('day'); 
      return;         
    }

    const selectedResource = resources.find(r => r.id === resourceId)?.title || `Sala ${resourceId}`;
    
    const supervisor_name = window.prompt(
      `Reservando ${selectedResource} (${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')})\n¿Nombre del Supervisor?`
    );

    if (supervisor_name) {
      const { error } = await supabase
        .from('reservations')
        .insert([
          {
            supervisor_name,
            start_time: start.toISOString(),
            end_time: end.toISOString(),
            resource_id: resourceId,
            type: 'conference',
          },
        ]);

      if (error) {
        alert('Error al guardar. Revisa la consola.');
        console.error(error);
      } else {
        fetchReservations(); 
      }
    }
  };

  const { views } = useMemo(
    () => ({
      views: { month: true, week: true, day: true },
    }),
    []
  );

  // ... (Código de carga y retorno del componente) ...
  if (loading) {
    return (
      <div className="container mx-auto p-8 font-sans text-center">
        <h1 className="text-2xl font-bold text-gray-700">Cargando reservas...</h1>
        <p className="text-gray-500">Conectando con Supabase. Por favor espere.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Salas de Conferencia 💼</h1>
          <p className="text-gray-500">
            Vista: {view === 'month' ? 'Selecciona un día para ver horas' : 'Arrastra para reservar horas / Haz clic para cancelar'}
          </p>
        </div>
        <a href="/calendar" className="text-sm bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition text-gray-700">← Volver</a>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border border-gray-200 h-[700px]">
        <Calendar
          localizer={localizer}
          events={events}
          views={views}
          defaultView="day" 
          step={30} 
          timeslots={2}
          selectable
          
          // FUNCIONES DE INTERACCIÓN
          onSelectSlot={handleSelectSlot} // Crear reserva
          onSelectEvent={handleSelectEvent} // <-- NUEVA FUNCIÓN: Ver/Cancelar reserva existente
          
          view={view}
          onView={(newView: any) => setView(newView)}
          date={date}
          onNavigate={(newDate: Date) => setDate(newDate)}
          
          resources={resources}
          resourceIdAccessor="id"
          resourceTitleAccessor="title"
          style={{ height: 650 }}
        />
      </div>
    </div>
  );
}
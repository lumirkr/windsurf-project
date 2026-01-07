'use client'; 
import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { supabase } from '@/lib/supabase';

const localizer = momentLocalizer(moment);

interface ReservationEvent {
  id: number;
  title: string; 
  start: Date;
  end: Date;
  resourceId: number;
  allDay?: boolean; 
}

export default function TrainingCalendar() {
  
  // --- DEFINICIÓN DE SALAS INTELIGENTES ---
  const resources = [
    { id: 100, title: '🏢 Sala Nivel 9 (COMPLETA - 20 pax)' },
    { id: 101, title: '🔹 Sala Nivel 9 (Solo Lado A - 10 pax)' },
    { id: 102, title: '🔹 Sala Nivel 9 (Solo Lado B - 10 pax)' },
    { id: 200, title: '💼 Oficina Coworker' }, 
  ];
  
  const [events, setEvents] = useState<ReservationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('month'); 

  // 1. LEER RESERVAS
  const fetchReservations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reservations')
      .select('id, supervisor_name, start_time, end_time, resource_id')
      .eq('type', 'training'); 

    if (error) {
      console.error('Error al obtener reservas:', error);
      setLoading(false);
      return;
    }

    const fetchedEvents: ReservationEvent[] = data.map(item => ({
      id: item.id,
      title: item.supervisor_name, 
      start: new Date(item.start_time),
      end: new Date(item.end_time),
      resourceId: item.resource_id,
      allDay: true, 
    }));
    
    setEvents(fetchedEvents);
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // --- FUNCIÓN DE INTELIGENCIA (VALIDACIÓN DE CONFLICTO) ---
  const checkAvailability = (dateToCheck: Date, resourceId: number) => {
    const formattedDate = moment(dateToCheck).format('YYYY-MM-DD');

    const conflict = events.find(event => {
      const eventDate = moment(event.start).format('YYYY-MM-DD');
      if (eventDate !== formattedDate) return false;

      // LÓGICA DE CONFLICTO
      if (resourceId === 100) {
        return event.resourceId === 100 || event.resourceId === 101 || event.resourceId === 102;
      }
      if (resourceId === 101) {
        return event.resourceId === 100 || event.resourceId === 101;
      }
      if (resourceId === 102) {
        return event.resourceId === 100 || event.resourceId === 102;
      }
      return event.resourceId === resourceId;
    });

    return conflict; 
  };


  // --- BORRAR RESERVAS ---
  const deleteReservation = async (reservationId: number, title: string) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas CANCELAR la reserva de ${title}?`);
    if (confirmDelete) {
      const { error } = await supabase.from('reservations').delete().eq('id', reservationId);
      if (!error) {
        fetchReservations(); 
        alert(`Reserva cancelada.`);
      }
    }
  };

  const handleSelectEvent = (event: ReservationEvent) => {
    const resource = resources.find(r => r.id === event.resourceId)?.title;
    const dateStr = moment(event.start).format('DD/MM/YYYY');
    const action = window.prompt(
      `SALA: ${resource}\nFECHA: ${dateStr}\nSUPERVISOR: ${event.title}\n\nEscribe 'CANCELAR' para eliminar:`
    );
    if (action?.toUpperCase() === 'CANCELAR') deleteReservation(event.id, event.title);
  };

  // 2. GUARDAR NUEVA RESERVA (CON VALIDACIÓN)
  const handleSelectSlot = async ({ start, resourceId }: any) => {
    const selectedResource = resources.find(r => r.id === resourceId)?.title;
    const reservationDate = moment(start).format('YYYY-MM-DD');

    const conflictEvent = checkAvailability(start, resourceId);
    
    if (conflictEvent) {
      const conflictResourceName = resources.find(r => r.id === conflictEvent.resourceId)?.title;
      alert(`⚠️ NO SE PUEDE RESERVAR.\n\nYa existe una reserva ese día en: "${conflictResourceName}".\n\nDebido a que la sala se divide, no puedes reservar este espacio si la otra parte (o la sala completa) está ocupada.`);
      return;
    }

    const supervisor_name = window.prompt(
      `Reservando ${selectedResource} el DÍA: ${reservationDate}.\n¿Nombre del Supervisor?`
    );

    if (supervisor_name) {
      const fullDayStart = moment(start).startOf('day').toDate();
      const fullDayEnd = moment(start).endOf('day').toDate();

      const { error } = await supabase
        .from('reservations')
        .insert([{
            supervisor_name,
            start_time: fullDayStart.toISOString(),
            end_time: fullDayEnd.toISOString(),
            resource_id: resourceId,
            type: 'training',
        }]);

      if (error) {
        alert('Error al guardar.');
      } else {
        fetchReservations(); 
      }
    }
  };

  const { views } = useMemo(() => ({ views: { month: true, week: true, day: true } }), []);

  if (loading) return <div className="p-8 text-center">Cargando calendario...</div>;

  return (
    <div className="container mx-auto p-8 font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Salas de Entrenamiento 🎓</h1>
          <p className="text-gray-500">Sistema inteligente: Detecta conflictos entre Sala Completa y Divisiones.</p>
        </div>
        <a href="/calendar" className="text-sm bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition text-gray-700">← Volver</a>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border border-gray-200 h-[700px]">
        <Calendar
          localizer={localizer}
          events={events}
          views={views}
          defaultView="month"
          selectable
          
          // ESTA FUNCIÓN SE ENCARGA DE LA VISUALIZACIÓN DEL EVENTO
          eventPropGetter={(event) => ({
            title: event.title, // Asegura que el título sea el nombre del supervisor
          })}

          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          view={view}
          onView={(newView: any) => setView(newView)}
          date={date}
          onNavigate={(newDate: Date) => setDate(newDate)}
          
          resources={resources}
          resourceIdAccessor="id"
          resourceTitleAccessor="title"
          allDayAccessor="allDay"
          style={{ height: 650 }}
        />
      </div>
    </div>
  );
}
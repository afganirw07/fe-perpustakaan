"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, EventContentArg, EventClickArg } from "@fullcalendar/core";
import { readAllPeminjaman } from "@/lib/peminjaman";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    userName: string;
    bookTitle: string;
    type: "Pinjam" | "Kembali";
  };
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeminjamanEvents = async () => {
      setIsLoading(true);
      try {
        const response = await readAllPeminjaman();
        console.log(response);
        if (response.success && Array.isArray(response.data)) {
          const peminjamanEvents: CalendarEvent[] = [];
          response.data
            .filter((peminjaman) => peminjaman.status === "disetuju")
            .forEach((peminjaman) => {
              const userName = peminjaman.full_name || "Unknown User";
              const bookTitle = peminjaman.books?.title || "Unknown Book";
              peminjamanEvents.push({
                id: `${peminjaman.id}-pinjam`,
                title: `Pinjam: ${bookTitle} (${userName})`,
                start: peminjaman.tanggal_peminjaman,
                extendedProps: { calendar: "Primary", userName, bookTitle, type: "Pinjam" },
              });

              if (peminjaman.tanggal_pengembalian) {
                peminjamanEvents.push({
                  id: `${peminjaman.id}-kembali`,
                  title: `Kembali: ${bookTitle} (${userName})`,
                  start: peminjaman.tanggal_pengembalian,
                  extendedProps: {
                    calendar: "Success",
                    userName,
                    bookTitle,
                    type: "Kembali",
                  },
                });
              }
            });
          setEvents(peminjamanEvents);
        }
      } catch (error) {
        toast.error("Gagal memuat data peminjaman ke kalender.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeminjamanEvents();
  }, []);

  if (isLoading) {
    return <div className="p-10 text-center">Memuat kalender...</div>;
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedEvent(clickInfo.event as any);
  };

  return (
    <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
        />
      </div>
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          className="max-w-lg p-6 lg:p-8"
        >
          <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
            <h5 className="mb-4 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              Detail Peminjaman
            </h5>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>Status:</strong> {selectedEvent.extendedProps.type}
              </p>
              <p>
                <strong>Buku:</strong> {selectedEvent.extendedProps.bookTitle}
              </p>
              <p>
                <strong>Peminjam:</strong> {selectedEvent.extendedProps.userName}
              </p>
              <p>
                <strong>Tanggal:</strong>{" "}
                {new Date(selectedEvent.start as string).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm cursor-pointer`}
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;

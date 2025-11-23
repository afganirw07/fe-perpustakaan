"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, EventContentArg } from "@fullcalendar/core";
import { readUserPeminjaman } from "@/lib/peminjaman";
import { toast } from "sonner";

interface CalendarEvent extends EventInput {
    extendedProps: {
        calendar: string;
    };
}

const CalendarUser: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const calendarRef = useRef<FullCalendar>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
        return null;
    };

    useEffect(() => {
        const fetchPeminjamanEvents = async () => {
            setIsLoading(true);
            try {
                const userId = getCookie("user_id");
                if (!userId) {
                    toast.error("User tidak ditemukan.");
                    return;
                }

                const response = await readUserPeminjaman(userId);
                if (response.success && Array.isArray(response.data)) {
                    const peminjamanEvents: CalendarEvent[] = [];
                    response.data
                        .filter((peminjaman) => peminjaman.status === "disetujui")
                        .forEach((peminjaman) => {
                            peminjamanEvents.push({
                                id: `${peminjaman.id}-pinjam`,
                                title: `Pinjam: ${peminjaman.books?.title || 'Buku'}`,
                                start: peminjaman.tanggal_peminjaman,
                                extendedProps: { calendar: "Primary" },
                            });

                            if (peminjaman.tanggal_pengembalian) {
                                peminjamanEvents.push({
                                    id: `${peminjaman.id}-kembali`,
                                    title: `Batas Kembali: ${peminjaman.books?.title || 'Buku'}`,
                                    start: peminjaman.tanggal_pengembalian,
                                    extendedProps: { calendar: "Warning" },
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
                    selectable={false} 
                    eventContent={renderEventContent}
                />
            </div>
        </div>
    );
};

const renderEventContent = (eventInfo: EventContentArg) => {
    const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
    return (
        <div
            className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
        >
            <div className="fc-daygrid-event-dot"></div>
            <div className="fc-event-time">{eventInfo.timeText}</div>
            <div className="fc-event-title">{eventInfo.event.title}</div>
        </div>
    );
};

export default CalendarUser;

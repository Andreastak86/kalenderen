"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
    getEventsByDate,
    addEvent,
    deleteEvent,
} from "@/components/helpers/events";

interface DayModalProps {
    date: Date | null;
    onClose: () => void;
}

export default function DayModal({ date, onClose }: DayModalProps) {
    const [events, setEvents] = useState<{ id: string; title: string }[]>([]);
    const [newEvent, setNewEvent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isoDate = date?.toISOString().split("T")[0] ?? "";

    useEffect(() => {
        if (!isoDate) return;
        getEventsByDate(isoDate).then((data) => {
            setEvents(data ?? []);
        });
    }, [isoDate]);

    // Legg til ny hendelse
    async function handleAddEvent() {
        if (!newEvent.trim()) return;
        setIsSubmitting(true);
        const added = await addEvent(isoDate, newEvent.trim());
        if (added) {
            setEvents((prev) => [...prev, added]);
            setNewEvent("");
        }
        setIsSubmitting(false);
    }
    async function handleDelete(id: string) {
        const success = await deleteEvent(id);
        if (success) {
            setEvents((prev) => prev.filter((e) => e.id !== id));
        }
    }

    if (!date) return null;

    return (
        <Dialog.Root open={!!date} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/50 z-40' />
                <Dialog.Content className='fixed top-1/2 left-1/2 z-50 max-w-sm w-full bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-lg transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='flex justify-between items-center mb-4'>
                        <Dialog.Title className='text-lg font-bold'>
                            {format(date, "EEEE d. MMMM yyyy", { locale: nb })}
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button className='text-gray-500 hover:text-black dark:hover:text-white'>
                                <X />
                            </button>
                        </Dialog.Close>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            {events.length === 0 ? (
                                <p className='text-sm text-gray-500'>
                                    Ingen hendelser.
                                </p>
                            ) : (
                                <ul className='space-y-1 text-sm'>
                                    {events.map((e) => (
                                        <li
                                            key={e.id}
                                            className='p-2 bg-gray-100 rounded flex justify-between items-center'
                                        >
                                            <span>{e.title}</span>
                                            <button
                                                onClick={() =>
                                                    handleDelete(e.id)
                                                }
                                                className='text-red-500 hover:text-red-700 text-xs'
                                                title='Slett'
                                            >
                                                🗑️
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className='flex gap-2'>
                            <input
                                type='text'
                                value={newEvent}
                                onChange={(e) => setNewEvent(e.target.value)}
                                placeholder='Ny hendelse...'
                                className='flex-1 border rounded px-2 py-1 text-sm'
                            />
                            <button
                                onClick={handleAddEvent}
                                disabled={isSubmitting || !newEvent.trim()}
                                className='bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50'
                            >
                                Lagre
                            </button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

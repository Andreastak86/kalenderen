"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { X } from "lucide-react";

interface DayModalProps {
    date: Date | null;
    onClose: () => void;
}

export default function DayModal({ date, onClose }: DayModalProps) {
    if (!date) return null;

    return (
        <Dialog.Root open={!!date} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0  z-40' />
                <Dialog.Content className='fixed top-1/2 left-1/2 z-50 max-w-sm w-full bg-pink-200 dark:bg-neutral-900 rounded-xl p-6 shadow-lg transform -translate-x-1/2 -translate-y-1/2'>
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
                    <div>
                        <p>
                            Her skal du kunne legge inn notater.... på sikt....
                        </p>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

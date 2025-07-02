"use client";

import {
    // addYears,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getWeek,
    isSameDay,
    // startOfMonth,
    startOfWeek,
} from "date-fns";
import { nb } from "date-fns/locale";
import { useMemo, useState } from "react";
import * as React from "react";
import { getNorwegianHolidays } from "./helpers/getNorwegianHolidays";
import DayModal from "./DayModal";

const months = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
];

const weekdays = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

export default function Calendar() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handlePrevYear = () => setYear((prev) => prev - 1);
    const handleNextYear = () => setYear((prev) => prev + 1);
    const handleResetYear = () => setYear(today.getFullYear());
    const holidays = useMemo(() => getNorwegianHolidays(year), [year]);

    return (
        <div className='p-4 space-y-8'>
            <div className='flex justify-between items-center'>
                <button onClick={handlePrevYear} className='text-sm underline'>
                    ← Forrige år
                </button>
                <h1 className='text-xl font-bold'>{year}</h1>
                <button onClick={handleNextYear} className='text-sm underline'>
                    Neste år →
                </button>
            </div>
            <div className='text-center'>
                <button onClick={handleResetYear} className='text-sm underline'>
                    Gå til i dag
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                {months.map((monthName, monthIndex) => {
                    const firstDay = new Date(year, monthIndex, 1);
                    const lastDay = endOfMonth(firstDay);

                    const days = eachDayOfInterval({
                        start: startOfWeek(firstDay, { weekStartsOn: 1 }),
                        end: endOfWeek(lastDay, { weekStartsOn: 1 }),
                    });

                    const weeks: Date[][] = [];
                    for (let i = 0; i < days.length; i += 7) {
                        weeks.push(days.slice(i, i + 7));
                    }

                    return (
                        <div key={monthIndex}>
                            <h2 className='text-lg font-semibold mb-2'>
                                {monthName}
                            </h2>
                            <div className='grid grid-cols-[3rem_repeat(7,_1fr)] text-xs border'>
                                <div className='bg-gray-100 text-center p-1 font-bold'>
                                    Uke
                                </div>
                                {weekdays.map((day) => (
                                    <div
                                        key={day}
                                        className='bg-gray-100 text-center p-1 font-bold'
                                    >
                                        {day}
                                    </div>
                                ))}

                                {weeks.map((week, weekIdx) => (
                                    <React.Fragment key={weekIdx}>
                                        <div className='text-center p-1 border-r bg-gray-50 font-medium'>
                                            {getWeek(week[0], {
                                                locale: nb,
                                                weekStartsOn: 1,
                                            })}
                                        </div>
                                        {week.map((date, idx) => {
                                            const isCurrentMonth =
                                                date.getMonth() === monthIndex;
                                            const isToday = isSameDay(
                                                date,
                                                today
                                            );
                                            const iso = date
                                                .toISOString()
                                                .split("T")[0];
                                            const holidayName = holidays[iso];
                                            const isSunday =
                                                date.getDay() === 0;

                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() =>
                                                        setSelectedDate(date)
                                                    }
                                                    title={holidayName ?? ""}
                                                    className={`cursor-pointer text-center p-1 border transition
                                                  hover:bg-blue-50 dark:hover:bg-neutral-800
                                                  ${
                                                      isCurrentMonth
                                                          ? ""
                                                          : "text-gray-400"
                                                  }
                                                  ${
                                                      isToday
                                                          ? "bg-blue-200 font-bold"
                                                          : ""
                                                  }
                                                  ${
                                                      holidayName
                                                          ? "bg-red-100 text-red-700 font-semibold"
                                                          : ""
                                                  }
                                                  ${
                                                      isSunday && !holidayName
                                                          ? "text-red-500"
                                                          : ""
                                                  }
                                                `}
                                                >
                                                    {format(date, "d", {
                                                        locale: nb,
                                                    })}
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </div>
                            <DayModal
                                date={selectedDate}
                                onClose={() => setSelectedDate(null)}
                            />
                        </div>
                    );
                })}
                ;
            </div>
        </div>
    );
}

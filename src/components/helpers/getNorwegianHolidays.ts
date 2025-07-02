import Holidays from "date-holidays";

export type HolidayMap = Record<string, string>;

export function getNorwegianHolidays(year: number): HolidayMap {
    const hd = new Holidays("NO");
    const holidays = hd.getHolidays(year);

    const publicHolidays = holidays.filter((h) => h.type === "public");

    const holidayMap: HolidayMap = {};
    for (const h of publicHolidays) {
        const date = new Date(h.date);
        const key = date.toISOString().split("T")[0];
        holidayMap[key] = h.name;
    }

    return holidayMap;
}

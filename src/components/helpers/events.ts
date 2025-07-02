import { supabase } from "@/lib/supabaseClient";

export async function getEventsByDate(date: string) {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("date", date)
        .order("created_at", { ascending: true });

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export async function addEvent(date: string, title: string) {
    const { data, error } = await supabase
        .from("events")
        .insert([{ date, title }]);

    if (error) {
        console.error(error);
        return null;
    }

    return data?.[0] ?? null;
}

export async function getEventDatesForYear(year: number): Promise<Set<string>> {
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;

    const { data, error } = await supabase
        .from("events")
        .select("date")
        .gte("date", start)
        .lte("date", end);

    if (error) {
        console.error("Feil ved henting av datoer:", error);
        return new Set();
    }

    const isoDates = data?.map((e) => e.date) ?? [];
    return new Set(isoDates);
}

export async function deleteEvent(id: string) {
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
        console.error("Feil ved sletting:", error);
        return false;
    }

    return true;
}

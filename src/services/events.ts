import { supabase } from '../lib/supabase';

export async function getEvents() {
    const { data } = await supabase.from('Events').select('*').throwOnError();
    return data;
}

export async function getEvent(id: string) {
    const { data } = await supabase.from('Events').select('*').eq('id', id)
        .throwOnError().single();
    return data;
}
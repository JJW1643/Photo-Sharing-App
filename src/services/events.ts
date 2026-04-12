import { supabase } from '../lib/supabase';

export async function getEvents() {
    const { data } = await supabase.from('Events').select('*').throwOnError();
    return data;
}

// Want event info but also want to select all the related assets for that event, you can do this by using the select method and passing in the name of the related table in parentheses. This will return an object with the event info and an array of related assets.

export async function getEvent(id: string) {
    const { data } = await supabase.from('Events').select('*, assets(*)').eq('id', id)
        .throwOnError().single();
    return data;
}
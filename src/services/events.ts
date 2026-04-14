import { supabase } from '../lib/supabase';
import { TablesInsert } from '../types/database.types';

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

// This function creates a new event in the database. It takes an object that matches the shape of the Events table insert type, which includes the name of the event and optionally the created_at timestamp and id (if you want to specify it, otherwise it will be generated automatically). The function uses the supabase client to insert the new event into the Events table and returns the created event data.

export async function createEvent(newEvent: TablesInsert<'Events'>) {
    const { data } = await supabase.from('Events').insert(newEvent).select().single().throwOnError();

    return data;
}
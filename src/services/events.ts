import { supabase } from '../lib/supabase';
import { TablesInsert } from '../types/database.types';

export async function getEvents() {
    const { data } = await supabase.from('Events').select('*').throwOnError();
    return data;
}

// This function retrieves all events that a specific user is a member of. It queries the event_memberships table to find all records where the user_id matches the provided userId, and then selects the related event information from the Events table using a join. The result is an array of event objects that the user is associated with.

export async function getEventsForUser(userId: string) {
    const { data } = await supabase.from('event_memberships')
        .select('*, Events(*)')
        .eq('user_id', userId)
        .throwOnError();
    return data.map((event_membership) => event_membership.Events);
}

// Want event info but also want to select all the related assets for that event, you can do this by using the select method and passing in the name of the related table in parentheses. This will return an object with the event info and an array of related assets.

export async function getEvent(id: string) {
    const { data } = await supabase.from('Events').select('*, assets(*)').eq('id', id)
        .throwOnError().single();
    return data;
}

// This function creates a new event in the database. It takes an object that matches the shape of the Events table insert type, which includes the name of the event and optionally the created_at timestamp and id (if you want to specify it, otherwise it will be generated automatically). The function uses the supabase client to insert the new event into the Events table and returns the created event data. After creating the event, it also creates a new record in the event_memberships table to link the creator of the event (the user) to the newly created event, making them a member of that event.

export async function createEvent(newEvent: TablesInsert<'Events'>, userId: string) {
    const { data } = await supabase.from('Events').insert(newEvent).select().single().throwOnError();

    await supabase.from('event_memberships').insert({
        event_id: data.id,
        user_id: userId,
    }).select().single().throwOnError();

    return data;
}

// This function allows a user to join an event by inserting a new record into the event_memberships table. It takes the eventId and userId as parameters and creates a new membership record linking the user to the event. The function returns the created membership data.

export async function joinEvent(eventId: string, userId: string) {
    const { data } = await supabase.from('event_memberships').insert({ 
        event_id: eventId, 
        user_id: userId 
    }).select().single().throwOnError();
    return data;    
}

// This is the entry point of the application. It defines the main component that will be rendered when the app starts. English - Create a screen called Home containing the text 'Home Screen'

import { Text, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../services/events';
import EventListItem from '../components/EventListItem';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';



// The Home component is a simple functional component that renders a view with some text. This will be the main screen of the app.
export default function Home() {


    // We are using Supabase and fetching the events from supabase but we are doing that as part of a usequery which means we don't have to use state, loading state etc, everything is done by the usequery hook. The useQuery hook takes an object with a queryKey and a queryFn. The queryKey is a unique identifier for this query, and the queryFn is an asynchronous function that fetches the data. In this case, we are fetching the events from the 'Events' table in Supabase. If there is an error during fetching, we throw the error so that it can be handled by the useQuery hook.

    const {data, isLoading, error} = useQuery({
        queryKey: ['Events'],
        queryFn: getEvents,
    });

 
    
    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error loading events: {error.message}</Text>;
    }

    // This is what the component actually displays on screen. Everything inside here is what the user will see when they open the app.

    // This code produces a link to the camera screen of the app. It uses the Link component from expo-router to navigate to the camera screen when the user clicks on it. The link is styled using Tailwind CSS classes to make it look nice and consistent with the rest of the app's design.
    return (
            <FlatList 
                data={data}
                contentContainerClassName='gap-4 p-4'
                renderItem={({item}) => <EventListItem event={item} />}
                contentInsetAdjustmentBehavior='automatic'
                ListHeaderComponent={() => (
                    <Link href='/events/create' asChild>
                        <Pressable className='bg-neutral-100 p-3 rounded-lg mb-4 items-center flex-row justify-center gap-2'>
                            <Ionicons name='add' size={36} color='neutral-800' />
                            <Text className= 'text-neutral-800 text-2xl font-bold'>Create Event</Text>
                        </Pressable>
                    </Link>

                )}
            />  
    );
}

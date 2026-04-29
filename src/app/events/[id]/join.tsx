import { View, Text, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getEvent, joinEvent } from '@/services/events';
import { useAuth } from '@/providers/AuthProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

export default function Join() {

    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // This query fetches the event data using the getEvent function and the event id from the search parameters. The data is stored in the event variable and can be used to display the event information in the UI.

    const {data: event} = useQuery({
        queryKey: ['Events', id],
        queryFn: () => getEvent(id),
    });

    // This mutation allows the user to join the event by calling the joinEvent function with the event id and the user's id. On success, it invalidates the query for the event to refresh the data and then navigates the user to the event's page.

    const joinEventMutation = useMutation({
        mutationFn: () => joinEvent(id, user!.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Events', id] });
            router.replace(`/events/${id}`);
        }
    });
    

    // This component displays the event name and a button to join the event. When the button is pressed, it triggers the joinEventMutation which handles the logic for joining the event and updating the UI accordingly.

    return (
        <View className='flex-1 p-4 gap-6 items-center justify-center'>
            <Text className='text-neutral-400 text-lg font-bold'>
                You are invited to join
            </Text>
            <Text className='text-white text-4xl font-bold'>
                {event?.name}
            </Text>
            <Button title='Join Event' onPress={() => joinEventMutation.mutate()} />
         </View>
    
    );
}
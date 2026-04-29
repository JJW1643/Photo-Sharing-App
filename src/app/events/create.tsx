import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createEvent } from '@/services/events';
import { useAuth } from '@/providers/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

export default function CreateEvent() {

    // This is a piece of state that will hold the value of the event name input. The initial value is an empty string. When the user types in the text input, this state will be updated with the current value of the input.

    const [name, setEventName] = useState('');
    const {user} = useAuth();
    const queryClient = useQueryClient();

    // This mutation is used to create a new event in the database. The mutationFn is a function that calls the createEvent function with the new event data (in this case, just the name). When the mutation is successful, it will return the created event data.

    const createEventMutation = useMutation({
        mutationFn: () => createEvent({ name, owner_id: user?.id }, user!.id),
        onSuccess:(data) => {
            // After the event is created, we want to invalidate the 'Events' query so that any screen that is using the list of events will refetch the data and show the new event in the list. This ensures that after creating a new event, the user will see it in the events list without needing to manually refresh. We also reset the name state to an empty string to clear the input, and then we navigate to the event details page for the newly created event using router.replace(`/events/${data.id}`).
            setName('');
            queryClient.invalidateQueries({ queryKey: ['Events'] });
            router.replace(`/events/${data.id}`);
        }
    });
    
    // This is the screen for creating a new event. It has a text input for the event name and a button to create the event. The onPress handler for the button is currently empty, but this is where you would add the logic to create the event in the database when the button is pressed.

    return (
        <View className='flex-1 p-4 gap-4'>
            <TextInput
                value={name}
                onChangeText={setEventName}
                placeholder="Event Name" 
                className="bg-neutral-800 p-5 rounded-lg text-white"
                placeholderTextColor='gray'
            />
            <Button title='Create Event' onPress={() => createEventMutation.mutate()} />
         </View>
        
    );
}

function setName(arg0: string) {
    throw new Error('Function not implemented.');
}

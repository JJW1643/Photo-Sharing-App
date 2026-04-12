
import { Text, Pressable } from 'react-native';
import { Tables } from '../types/database.types';
import { Link } from 'expo-router';


type Event = Tables<'Events'>;

type EventListItemProps = {
    event: Event;
};

// The EventListItem component is a simple functional component that takes an event as a prop and renders a view with the event name. The view is styled using Tailwind CSS classes to make it look nice and consistent with the rest of the app's design. The component is wrapped in a Link component from expo-router, which allows the user to navigate to the event details screen when they click on the event item.

export default function EventListItem({ event }: EventListItemProps) {
    return (
    <Link href ={'/events/' + event.id} asChild>
        <Pressable className='bg-emerald-600 p-4 rounded-lg'>
            <Text className='text-white text-2xl font-bold'>{event.name}</Text>
        </Pressable>
    </Link>
    );
     
}
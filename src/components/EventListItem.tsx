
import { View, Text } from 'react-native';
import { Tables } from '../types/database.types';

type Event = Tables<'Events'>;

type EventListItemProps = {
    event: Event;
};

export default function EventListItem({ event }: EventListItemProps) {
    return (
    <View className='bg-emerald-600 p-4 rounded-lg'>
        <Text className='text-white text-2xl font-bold'>{event.name}</Text>;
    </View>
    );
     
}
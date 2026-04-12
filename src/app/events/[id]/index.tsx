import { View, Text, ActivityIndicator, Pressable, FlatList } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getEvent } from '@/services/events';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AssetItem from '@/components/AssetItem';

export default function EventDetails() {

    // We are using the useLocalSearchParams hook from expo-router to get the id of the event from the URL. The id is then used to fetch the event details from the backend using the getEvent function. The useQuery hook is used to manage the fetching and caching of the event data. The queryKey is set to ['Event', id] to ensure that the data is cached correctly based on the event id. The queryFn is a function that calls getEvent with the id to fetch the event details. If there is an error during fetching, we throw the error so that it can be handled by the useQuery hook.

    const { id } = useLocalSearchParams<{ id: string }>();

    const {data: event, isLoading, error, isRefetching, refetch,} = useQuery({
        queryKey: ['Events', id],
        queryFn: () => getEvent(id),
    });


    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error || !event) {
        return <Text>Error loading event: {error?.message || 'Event not found'}</Text>;
    }


    // This is what the component actually displays on screen. Everything inside here is what the user will see when they open the event details page. We are using the AdvancedImage component from cloudinary-react-native to display an image of the event. We are able to import the Stack component from expo-router and use it to set the title of the screen to the name of the event. 
    return (
        <View className='mt-52 flex-1 '>
            <Stack.Screen options={{ title: event.name }} />

            <FlatList
                data={event.assets}
                numColumns={2}
                contentContainerClassName='gap-1 p-4'
                columnWrapperClassName='gap-1'
                renderItem={({ item }) => <AssetItem asset={item} />}
                contentInsetAdjustmentBehavior='automatic'
                refreshing={isRefetching}
                onRefresh={refetch}
            />

            

                <Link href={'/events/' + event.id + '/Camera'} asChild>
                    <Pressable className='absolute bottom-12 right-4 flex-row items-center justify-center bg-white p-5 rounded-full'>  
                        <Ionicons name='camera-outline' size={36} color='black' />
                    </Pressable>
                </Link>


        </View>
    );
}
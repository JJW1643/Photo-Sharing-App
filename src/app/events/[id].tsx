import { View, Text, useWindowDimensions, ActivityIndicator } from 'react-native';
import { AdvancedImage } from 'cloudinary-react-native';
import { cloudinary } from '../../lib/cloudinary';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { artisticFilter } from '@cloudinary/url-gen/actions/effect';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getEvent } from '../../services/events';
import { Activity } from 'react';
import { Stack } from 'expo-router';


export default function EventDetails() {

    // We are using the useLocalSearchParams hook from expo-router to get the id of the event from the URL. The id is then used to fetch the event details from the backend using the getEvent function. The useQuery hook is used to manage the fetching and caching of the event data. The queryKey is set to ['Event', id] to ensure that the data is cached correctly based on the event id. The queryFn is a function that calls getEvent with the id to fetch the event details. If there is an error during fetching, we throw the error so that it can be handled by the useQuery hook.

    const { id } = useLocalSearchParams<{ id: string }>();

    const {data: event, isLoading, error} = useQuery({
        queryKey: ['Events', id],
        queryFn: () => getEvent(id),
    });

    const {width} = useWindowDimensions();

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error || !event) {
        return <Text>Error loading event: {error?.message || 'Event not found'}</Text>;
    }


    // This is what the component actually displays on screen. Everything inside here is what the user will see when they open the event details page. We are using the AdvancedImage component from cloudinary-react-native to display an image of the event. We are able to import the Stack component from expo-router and use it to set the title of the screen to the name of the event. 
    return (
        <View className='mt-52'>
            <Stack.Screen options={{ title: event.name }} />
            <AdvancedImage
                cldImg={cloudinary
                    .image('jr0wmublish2uempb2se')
                    .resize(
                        thumbnail()
                        .height(width * (4 / 3))
                        .width(width)
                )
                .effect(artisticFilter('incognito')) }
            className='w-200 aspect-[3/4]'
        />
        </View>
    );
}
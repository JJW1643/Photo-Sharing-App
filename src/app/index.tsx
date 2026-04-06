
// This is the entry point of the application. It defines the main component that will be rendered when the app starts. English - Create a screen called Home containing the text 'Home Screen'

import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

// The Home component is a simple functional component that renders a view with some text. This will be the main screen of the app.
export default function Home() {

    // Use effect is a hook that helps us run a function when some things are changed or when the component first loads. In this case, we want to check if the user is already logged in when the app starts, so we use useEffect with an empty dependency array, which means it will only run once when the component mounts. Inside the useEffect, we call supabase.auth.getSession() to check if there is an active session for the user. If there is, we log the session data to the console. This is useful for debugging and can also be used to set the initial state of the app based on whether the user is logged in or not.
    useEffect(() => {
        supabase.
        from('Events')
        .select('*, assets(*)')
        .then((data) => console.log(JSON.stringify(data, null, 2)));
    }, []);

    // This is what the component actually displays on screen. Everything inside here is what the user will see when they open the app.

    // This code produces a link to the camera screen of the app. It uses the Link component from expo-router to navigate to the camera screen when the user clicks on it. The link is styled using Tailwind CSS classes to make it look nice and consistent with the rest of the app's design.
    return (
        <View className= 'flex-1 justify-center items-center bg-neutral-800 gap-20'>
            <Link href='/Camera' className='text-white text-2xl font-bold flex-row items-center space-x-2'>
               Open Camera
            </Link>

            <Link href='/event' className='text-white text-2xl font-bold flex-row items-center space-x-2'>
               Event Details
            </Link>
        </View>
    );
}

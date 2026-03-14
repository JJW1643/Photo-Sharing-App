
// This is the entry point of the application. It defines the main component that will be rendered when the app starts. English - Create a screen called Home containing the text 'Home Screen'

import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';


// The Home component is a simple functional component that renders a view with some text. This will be the main screen of the app.
export default function Home() {
    // This is what the component actually displays on screen. Everything inside here is what the user will see when they open the app.

    // This code produces a link to the camera screen of the app. It uses the Link component from expo-router to navigate to the camera screen when the user clicks on it. The link is styled using Tailwind CSS classes to make it look nice and consistent with the rest of the app's design.
    return (
        <View className= 'flex-1 justify-center items-center bg-neutral-800'>
            <Link href='/Camera' className='text-white text-2xl font-bold flex-row items-center space-x-2'>
               Open Camera
            </Link>
        </View>
    );
}

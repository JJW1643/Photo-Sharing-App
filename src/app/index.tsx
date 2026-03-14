
// This is the entry point of the application. It defines the main component that will be rendered when the app starts. English - Create a screen called Home containing the text 'Home Screen'

import { View, Text } from 'react-native';


// The Home component is a simple functional component that renders a view with some text. This will be the main screen of the app.
export default function Home() {
    // This is what the component actually displays on screen. Everything inside here is what the user will see when they open the app.
    return (
        <View className= 'flex-1 justify-center items-center bg-neutral-800'>
            <Text className='text-2xl font-bold text-white'>Home</Text>    
        </View>
    );
}

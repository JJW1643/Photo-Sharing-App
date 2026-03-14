
// This is the entry point of the application. It defines the main component that will be rendered when the app starts. English - Create a screen called Home containing the text 'Home Screen'

import { View, Text } from 'react-native';


// The Home component is a simple functional component that renders a view with some text. This will be the main screen of the app.
export default function Home() {
    // This is what the component actually displays on screen. Everything inside here is what the user will see when they open the app.
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text className='text-2xl font-bold'>Home</Text>    
        </View>
    );
}

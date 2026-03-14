
// This is the camera screen of the app. It will be used to take photos and videos. English - Create a screen called Camera containing the text 'Camera'
// This is a simple functional component that renders a view with some text. This will be the camera screen of the app.
import { View, Text } from 'react-native';

export default function Camera() {
    return (
        <View className='flex-1 justify-center items-center bg-red-200'>
            <Text>Camera</Text>
        </View>
    );
}

import '../../global.css';

// This is the root layout of the app, it wraps all the screens in the app and sets the theme to dark
import { Stack } from "expo-router";
// Import the dark theme from react navigation and wrap the entire app in it
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import Camera from './Camera';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

// This is the root layout of the app, it wraps all the screens in the app and sets the theme to dark
export default function RootLayout() {
    
    // Set the layout of the index page to be the events page
    return (
    <ThemeProvider value={DarkTheme}>
        <Stack>
            <Stack.Screen 
            name ="index" 
            options={{ 
                title: 'Events', 
                headerLargeTitle: true,
                headerShadowVisible: true,
                headerStyle: {
                    backgroundColor: '#141414',
                },
            }}
            />

            <Stack.Screen
            // This is the camera screen of the app, it will be used to take photos and videos and will have a back button to go back to the home screen
            name="Camera"
            options={{ title: 'Camera', 
                // This allows the header to be transparent and blur the background when the camera screen is open, it also makes the back button minimal and removes the shadow from the header
                headerBackButtonDisplayMode: 'minimal',
                headerTransparent: true,
                headerBlurEffect: 'dark',
                
                headerRight: () => (
                    // This is the share button on the camera screen, it will be used to share the photos and videos taken with the camera
                    <Link href='/' className='mr-2 ml-2'>
                        <Ionicons name="share-outline" size={24} color="white" />
                    </Link>
                )
             }}
            />
         </Stack>
        </ThemeProvider>
    );
}

import '../../global.css';

// This is the root layout of the app, it wraps all the screens in the app and sets the theme to dark
import { Stack } from "expo-router";
// Import the dark theme from react navigation and wrap the entire app in it
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

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
        </Stack>
        </ThemeProvider>
    );
}
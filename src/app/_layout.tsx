
import '../../global.css';

// This is the root layout of the app, it wraps all the screens in the app and sets the theme to dark
import { Stack } from "expo-router";
// Import the dark theme from react navigation and wrap the entire app in it
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import Camera from "./events/[id]/Camera";
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AuthProvider } from '../providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// The QueryClient is a central part of React Query that manages the caching and fetching of data in your application. By creating a single instance of QueryClient and providing it to your app using the QueryClientProvider, you enable React Query to efficiently handle data fetching, caching, and updating across all components in your app. This setup allows you to easily manage server state and keep your UI in sync with your backend data.

const queryClient = new QueryClient();

// This is the root layout of the app, it wraps all the screens in the app and sets the theme to dark
export default function RootLayout() {
    
    useEffect(() => {

        const signInIfNeeded = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error);
            }
            if (!data.session) {
                await supabase.auth.signInAnonymously();
            }
        };

        signInIfNeeded();
    }, []);



    // Set the layout of the index page to be the events page
    return (
    <ThemeProvider value={DarkTheme}>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>  
             <Stack>
                <Stack.Screen 
            name ="index" 
            options={{ 
                title: 'Events', 
                headerLargeTitle: true,
                headerTransparent: true,
                
            }}
            />

            <Stack.Screen
            name="events/[id]/index"
            options={{ 
                title: 'Event',
                headerLargeTitle: true,
                headerTransparent: true,
                headerBackButtonDisplayMode: 'minimal',
             }}
            />

                    <Stack.Screen
                        // This is the camera screen of the app, it will be used to take photos and videos and will have a back button to go back to the home screen
                        name="events/[id]/Camera"
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
                            ),
                        }}
                    />


                    <Stack.Screen
                        name='events/[id]/share'
                        options={{
                            title: 'Share Event',
                            presentation: 'modal',
                        }}

                    />

                    <Stack.Screen
                        name='events/[id]/join'
                        options={{
                            title: 'Join Event',
                            presentation: 'modal',
                        }}
                        
                    />


                    <Stack.Screen
                        name='events/create'
                        options={{
                            title: 'Create Event',
                            presentation: 'modal',
                        }}
                    />


                    </Stack>
                </AuthProvider> 
            </QueryClientProvider>
        </ThemeProvider>
    );
}
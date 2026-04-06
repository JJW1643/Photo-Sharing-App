import { createClient } from '@supabase/supabase-js';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { Database } from '../types/database.types';

// Create a single supabase client for interacting with your database and authentication throughout your app. The createClient function takes two arguments: the URL of your Supabase instance and the public anon key for your project. These values are stored in environment variables for security and can be accessed in the code using process.env.VARIABLE_NAME. The exclamation mark after each variable name is a TypeScript non-null assertion, which tells the compiler that we are sure these variables will be defined at runtime.


// With the type Database passed to createClient, we get type safety when interacting with our Supabase database. This means that when we query the database or perform any operations, TypeScript will check that we are using the correct types for our data, which helps prevent bugs and improves the overall reliability of our application. The options object passed as the third argument to createClient configures the authentication behavior of the Supabase client. We specify that we want to use AsyncStorage for storing authentication tokens, enable auto-refreshing of tokens, persist sessions across app restarts, and disable session detection in URLs (which is not relevant for a React Native app).

export const supabase = createClient<Database>(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!, 
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false
        }
    }
);



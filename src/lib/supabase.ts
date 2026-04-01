import { createClient } from '@supabase/supabase-js';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

// Create a single supabase client for interacting with your database and authentication throughout your app. The createClient function takes two arguments: the URL of your Supabase instance and the public anon key for your project. These values are stored in environment variables for security and can be accessed in the code using process.env.VARIABLE_NAME. The exclamation mark after each variable name is a TypeScript non-null assertion, which tells the compiler that we are sure these variables will be defined at runtime.



export const supabase = createClient(
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



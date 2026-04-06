import {createContext} from 'react';
import { User } from '@supabase/supabase-js';
import { useEffect, useState , useContext} from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

// This file defines the authentication context for the app. It creates a context called AuthContext that will be used to provide authentication information (such as the current user and whether they are authenticated) to the rest of the app. The AuthContextType defines the shape of the data that will be stored in the context, which includes a user object (or null if no user is logged in) and a boolean isAuthenticated to indicate whether the user is logged in or not. The createContext function is used to create the context with an initial value, which in this case is an object with user set to null and isAuthenticated set to false. This means that by default, when the app starts, it will assume that there is no user logged in until we check for an active session and update the context accordingly.

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false
});


    


// The AuthProvider component is a wrapper component that will be used to provide the authentication context to the rest of the app. It takes in children as props, which are the components that will be wrapped by the provider. Inside the provider, we set the value of the context to an object with user set to null and isAuthenticated set to false. In a real application, you would typically check for an active session and update these values accordingly when the provider mounts, but for now we are just setting them to their default values.

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [session, setSession] = useState<Session | null>(null);

    // // Use effect is a hook that helps us run a function when some things are changed or when the component first loads. In this case, we want to check if the user is already logged in when the app starts, so we use useEffect with an empty dependency array, which means it will only run once when the component mounts. Inside the useEffect, we call supabase.auth.getSession() to check if there is an active session for the user. If there is, we log the session data to the console. This is useful for debugging and can also be used to set the initial state of the app based on whether the user is logged in or not. We also check if there is no active session, and if not, we call supabase.auth.signInAnonymously() to sign the user in anonymously. This allows us to have a user session even if the user hasn't explicitly logged in, which can be useful for certain features of the app that require a user context.

    useEffect(() => {
        const signInIfNeeded = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                    setSession(data.session);
            }
                
                // Sign in anonymously if no session found
            if (!data.session) {
                const {data } = await supabase.auth.signInAnonymously();
                if (data.session) {
                    setSession(data.session);
                }
            }
        };
    
        signInIfNeeded();
    }, []);
    
    return (
        <AuthContext.Provider 
        value={{ user: session?.user || null, isAuthenticated: !!session }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};


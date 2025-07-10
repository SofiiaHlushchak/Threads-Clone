import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    user: {},
    setUser: ({}) => {},
    logOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState({});
    const [session, setSession] = useState<Session | null>(null);

    const getUser = async (session: Session | null) => {
        console.log("session", session);

        if (session) {
            // get the user from the db
            // setUser
            console.log("gettingUser");
            router.push("/(tabs)");
        }
    };

    const logOut = async () => {
        await supabase.auth.signOut();
        router.push("/(auth)");
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log("getSession");
            console.log(session);

            setSession(session);
            getUser(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            console.log("onAuthStateChange");
            console.log(session);

            setSession(session);
            getUser(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

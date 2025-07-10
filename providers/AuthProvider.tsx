import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    user: {},
    setUser: ({}) => {},
    logOut: () => {},
    createUser: (username: string) => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState({});
    const [session, setSession] = useState<Session | null>(null);

    const createUser = async (username: string) => {
        const { data, error } = await supabase
            .from("User")
            .insert({
                id: session?.user.id,
                username,
            })
            .select();

        if (error) console.error(error);
        if (!data) return;

        const user = data[0];
        setUser(user);
    };

    const getUser = async (session: Session | null) => {
        if (session) {
            const { data, error } = await supabase
                .from("User")
                .select()
                .eq("id", session.user.id);

            if (!error) {
                setUser(data[0]);
                router.push("/(tabs)");
            }
        }
    };

    const logOut = async () => {
        await supabase.auth.signOut();
        router.push("/(auth)");
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            getUser(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            getUser(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, logOut, createUser }}>
            {children}
        </AuthContext.Provider>
    );
};

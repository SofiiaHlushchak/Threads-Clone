import { Tabs, useRouter } from "expo-router";
import React from "react";

import { Heart, Home, Plus, Search, User } from "lucide-react-native";

export default function TabLayout() {
    const router = useRouter();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#0a7ea4",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "",
                    tabBarIcon: ({ color }) => <Home color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "",
                    tabBarIcon: ({ color }) => (
                        <Search color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="empty"
                options={{
                    title: "",
                    tabBarIcon: ({ color }) => <Plus color={color} size={24} />,
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        router.push("/post");
                    },
                }}
            />
            <Tabs.Screen
                name="activity"
                options={{
                    title: "",
                    tabBarIcon: ({ color }) => (
                        <Heart color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "",
                    tabBarIcon: ({ color }) => <User color={color} size={24} />,
                }}
            />
        </Tabs>
    );
}

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

// SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <GluestackUIProvider mode="light">
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(auth)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="post"
                            options={{
                                headerShown: false,
                                presentation: "modal",
                            }}
                        />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                </AuthProvider>
            </QueryClientProvider>
        </GluestackUIProvider>
    );
}

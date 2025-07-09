import { Stack } from "expo-router";

// eslint-disable-next-line react/display-name
export default () => (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="verify" options={{ headerShown: false }} />
        <Stack.Screen name="username" options={{ headerShown: false }} />
    </Stack>
);

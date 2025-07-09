import { StyleSheet, Text, View } from "react-native";

import { Box } from "@/components/ui/box";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Box className="bg-primary-500 p-5">
                <Text className="text-typography-0">Hello</Text>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

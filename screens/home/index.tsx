import { SafeAreaView, Text } from "react-native";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { useAuth } from "@/providers/AuthProvider";

const Home = () => {
    const { user } = useAuth();
    return (
        <SafeAreaView>
            <HStack className="justify-between">
                <Box className="bg-primary-500 p-5">
                    <Text className="text-typography-0">
                        Hello, {user?.username}
                    </Text>
                </Box>
                <Box className="bg-primary-500 p-5">
                    <Text className="text-typography-0">Home</Text>
                </Box>
            </HStack>
        </SafeAreaView>
    );
};

export default Home;

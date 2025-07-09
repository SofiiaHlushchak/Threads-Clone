import { SafeAreaView, Text } from "react-native";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";

const Search = () => {
    return (
        <SafeAreaView>
            <HStack className="justify-between">
                <Box className="bg-primary-500 p-5">
                    <Text className="text-typography-0">Hello</Text>
                </Box>
                <Box className="bg-primary-500 p-5">
                    <Text className="text-typography-0">Search</Text>
                </Box>
            </HStack>
        </SafeAreaView>
    );
};

export default Search;

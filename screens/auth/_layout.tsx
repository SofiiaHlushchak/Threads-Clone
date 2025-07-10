import ThreadsIcon from "@/assets/icons/threads";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const Layout = ({
    children,
    onPress,
    buttonText,
}: {
    children: React.ReactNode;
    onPress: () => void;
    buttonText: string;
}) => {
    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <VStack className="justify-between h-full w-full">
                        <VStack className="items-center justify-center">
                            <HStack className="justify-between w-full p-3">
                                <Button
                                    onPress={() => {
                                        router.back();
                                    }}
                                    size="lg"
                                    variant="link"
                                >
                                    <ButtonText>Back</ButtonText>
                                </Button>
                                <ThreadsIcon size={40} />
                                <View className="w-10" />
                            </HStack>
                        </VStack>
                        <VStack space="md" className="p-3">
                            {children}
                        </VStack>
                        <VStack className="items-center justify-center p-3">
                            <Button
                                onPress={onPress}
                                size="lg"
                                className="w-full rounded-xl"
                            >
                                <ButtonText>{buttonText}</ButtonText>
                            </Button>
                        </VStack>
                    </VStack>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Layout;

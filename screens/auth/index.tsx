import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

const Auth = () => {
    const { user, setUser } = useAuth();
    const [phone, setPhone] = useState("");

    const router = useRouter();

    useEffect(() => {
        setUser({
            name: "John Doe",
        });
    }, []);

    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithOtp({
            phone: `+1${phone}`,
        });

        if (!error) {
            router.push({
                pathname: "/(auth)/verify",
                params: {
                    phone: `+1${phone}`,
                },
            });
        }
    };

    return (
        <SafeAreaView>
            <Input variant="outline" size="md">
                <InputField
                    placeholder="Phone number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </Input>
            <Button onPress={handleSignIn}>
                <ButtonText>Sing in</ButtonText>
            </Button>
        </SafeAreaView>
    );
};

export default Auth;

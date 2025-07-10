import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Layout from "./_layout";

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
        <Layout onPress={handleSignIn} buttonText="Sign up">
            <Text className="text-lg font-bold text-black">
                Enter your phone number
            </Text>
            <Input variant="outline" size="md">
                <InputField
                    placeholder="Phone number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </Input>
        </Layout>
    );
};

export default Auth;

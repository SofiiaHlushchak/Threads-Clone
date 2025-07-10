import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { useState } from "react";
import Layout from "./_layout";

const UserName = () => {
    const [username, setUsername] = useState("");

    const handleUsername = async () => {
        console.log("userName");
    };
    return (
        <Layout onPress={handleUsername} buttonText="Create account">
            <Text className="text-2xl font-size">Verify</Text>
            <Input variant="outline" size="md">
                <InputField
                    placeholder="Enter your name"
                    value={username}
                    onChangeText={setUsername}
                    keyboardType="phone-pad"
                />
            </Input>
        </Layout>
    );
};

export default UserName;

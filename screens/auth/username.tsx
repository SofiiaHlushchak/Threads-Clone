import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import Layout from "./_layout";

const UserName = () => {
    const [username, setUsername] = useState("");

    const { createUser } = useAuth();

    return (
        <Layout
            onPress={() => createUser(username)}
            buttonText="Create account"
        >
            <Text className="text-2xl font-size">Verify</Text>
            <Input variant="outline" size="md">
                <InputField
                    placeholder="Enter your name"
                    value={username}
                    onChangeText={setUsername}
                />
            </Input>
        </Layout>
    );
};

export default UserName;

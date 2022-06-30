import {
    Button,
    Spinner,
    Flex,
    Input,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { ApiError } from "@supabase/supabase-js";
import React, { useState } from "react";

export default function Auth({}) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState<ApiError | null>(null);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const { error } = await supabaseClient.auth.signIn(
                { email },
                { shouldCreateUser: false, redirectTo: "/" }
            );
            if (error) {
                throw new Error();
            }
        } catch (err) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex flexDirection="column" justifyContent="space-between">
            <FormControl isInvalid={error ? true : false}>
                <FormLabel>Login</FormLabel>
                <Input
                    onChange={(event) => setEmail(event.target.value)}
                ></Input>
                {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
                <FormHelperText>Login by providing your email</FormHelperText>
            </FormControl>
            <Button onClick={handleLogin}>
                {loading ? <Spinner /> : "Login"}
            </Button>
        </Flex>
    );
}

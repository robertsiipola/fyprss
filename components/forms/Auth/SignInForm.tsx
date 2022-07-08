import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Flex,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthInfo, AuthInfoType } from "./schema";
import SignFields from "./signFields";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export default function SignInForm() {
    const [authError, setAuthError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthInfoType>({ resolver: zodResolver(AuthInfo) });

    async function onSubmit(data: AuthInfoType) {
        console.log(data);
        try {
            const { error } = await supabaseClient.auth.signIn(
                { email: data.email, password: data.password },
                { shouldCreateUser: false, redirectTo: "/" }
            );
            if (error) {
                console.log(error);
                throw new Error(error.message);
            }
        } catch (err) {
            if (err instanceof Error) {
                setAuthError(err.message);
            }
        }
    }

    return (
        <Flex
            height="100%"
            border="solid thin"
            borderRadius="0.5em"
            padding="3em"
        >
            <SignFields
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                isSubmitting={isSubmitting}
                onSubmit={onSubmit}
            ></SignFields>
            {authError && (
                <Alert status="error">
                    <AlertIcon></AlertIcon>
                    <AlertTitle>Problem with sign-in</AlertTitle>
                    <AlertDescription>{authError}</AlertDescription>
                </Alert>
            )}
        </Flex>
    );
}

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthInfo, AuthInfoType } from "./Schema";
import SignFields from "./SignFields";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { AuthViews } from "@/lib/types/auth";
import ViewChange from "./ViewChange";

interface SignUpFormProps {
    setAuthView: React.Dispatch<AuthViews>;
}

export default function SignUpForm({ setAuthView }: SignUpFormProps) {
    const [authError, setAuthError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthInfoType>({ resolver: zodResolver(AuthInfo) });

    async function onSubmit(data: AuthInfoType) {
        try {
            const { error } = await supabaseClient.auth.signUp(
                { email: data.email, password: data.password },
                { redirectTo: "/" }
            );
            if (error) {
                throw new Error(error.message);
            }
        } catch (err) {
            if (err instanceof Error) {
                setAuthError(err.message);
            }
        }
    }

    return (
        <Box>
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
                    <AlertTitle>Problem with sign-up</AlertTitle>
                    <AlertDescription>{authError}</AlertDescription>
                </Alert>
            )}
            <ViewChange
                setAuthView={setAuthView}
                authView={AuthViews.SIGN_IN}
                text="Already have an account? Sign in here"
            />
        </Box>
    );
}

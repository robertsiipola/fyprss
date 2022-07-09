import { Container } from "@chakra-ui/react";
import React, { useState } from "react";
import { SignInForm, SignUpForm } from "../Forms/Auth";
import { AuthViews } from "@/lib/types/auth";

interface AuthContainerProps {
    children?: JSX.Element;
}
function AuthContainer({ children }: AuthContainerProps) {
    return (
        <Container
            maxW="md"
            centerContent
            border="solid thin"
            borderRadius="0.5em"
            paddingY="3em"
        >
            {children}
        </Container>
    );
}

export default function Auth() {
    const [authView, setAuthView] = useState<AuthViews>(AuthViews.SIGN_IN);

    switch (authView) {
        case AuthViews.SIGN_IN:
            return (
                <AuthContainer>
                    <SignInForm setAuthView={setAuthView}></SignInForm>
                </AuthContainer>
            );
        case AuthViews.SIGN_UP:
            return (
                <AuthContainer>
                    <SignUpForm setAuthView={setAuthView}></SignUpForm>
                </AuthContainer>
            );
        default:
            return null;
    }
}

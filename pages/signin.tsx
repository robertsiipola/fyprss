import { SignInForm } from "@/components/Forms/Auth";
import { Flex } from "@chakra-ui/react";
import React from "react";
import type { NextPage } from "next";

const SignIn: NextPage = () => {
    return (
        <Flex
            minHeight="100vh"
            marginLeft="auto"
            marginRight="auto"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <SignInForm />
        </Flex>
    );
};

export default SignIn;

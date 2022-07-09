import { Flex } from "@chakra-ui/react";
import React from "react";
import type { NextPage } from "next";
import Auth from "@/components/Auth";

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
            <Auth />
        </Flex>
    );
};

export default SignIn;

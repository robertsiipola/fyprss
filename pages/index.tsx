import { Button, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    const { user } = useUser();
    const router = useRouter();
    if (user)
        return (
            <Flex>
                <Button onClick={() => supabaseClient.auth.signOut()}>
                    Sign out
                </Button>
            </Flex>
        );
    return (
        <Flex>
            <Button onClick={() => router.push("/signin")}>Sign in</Button>
        </Flex>
    );
};

export default Home;

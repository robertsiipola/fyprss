import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { useRouter } from "next/router";

function SideNav(): JSX.Element {
    const { user } = useUser();
    const router = useRouter();
    return (
        <Flex borderRight="solid">
            <VStack marginTop="2em" width="17vw">
                <Box>Hello there</Box>
                <Box>Settings</Box>
                {user && (
                    <Button
                        onClick={async () =>
                            await supabaseClient.auth.signOut()
                        }
                    >
                        Sign-out
                    </Button>
                )}
                {!user && (
                    <Button onClick={async () => router.push("/signin")}>
                        Sign-in
                    </Button>
                )}
            </VStack>
        </Flex>
    );
}

export default SideNav;

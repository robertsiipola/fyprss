import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import React from "react";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider supabaseClient={supabaseClient}>
            <ChakraProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </UserProvider>
    );
}

export default MyApp;

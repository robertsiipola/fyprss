import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import Main from "./Main";
import SideNav from "./SideNav";
import React from "react";

interface LayoutProps {
    children?: JSX.Element;
}

function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <Flex>
            <Flex flexDirection="column">
                <SideNav />
            </Flex>
            <Flex flexDirection="column">
                <Header />
                <Main>{children}</Main>
            </Flex>
        </Flex>
    );
}

export default Layout;

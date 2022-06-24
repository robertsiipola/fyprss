import { Flex } from "@chakra-ui/react";
import React from "react";

interface MainProps {
    children?: JSX.Element;
}

function Main({ children }: MainProps): JSX.Element {
    return <Flex>{children}</Flex>;
}

export default Main;

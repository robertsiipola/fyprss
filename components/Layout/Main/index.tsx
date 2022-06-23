import { Flex } from "@chakra-ui/react";

interface MainProps {
    children?: JSX.Element;
}

function Main({ children }: MainProps): JSX.Element {
    return <Flex>{children}</Flex>;
}

export default Main;

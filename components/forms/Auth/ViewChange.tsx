import React from "react";
import { Text } from "@chakra-ui/react";
import { AuthViews } from "@/lib/types/auth";

interface ViewChangeProps {
    text: string;
    setAuthView: React.Dispatch<AuthViews>;
    authView: AuthViews;
}

function ViewChange({ text, setAuthView, authView }: ViewChangeProps) {
    return (
        <Text
            onClick={() => setAuthView(authView)}
            cursor="pointer"
            fontSize="sm"
            as="ins"
            fontWeight="bold"
        >
            {text}
        </Text>
    );
}

export default ViewChange;

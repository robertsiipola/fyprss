import React from "react";
import {
    Button,
    Input,
    FormControl,
    FormErrorMessage,
    FormLabel,
    VStack,
    Box,
} from "@chakra-ui/react";
import {
    UseFormRegister,
    UseFormHandleSubmit,
    FieldErrorsImpl,
    SubmitHandler,
    DeepRequired,
} from "react-hook-form";
import { AuthInfoType } from "./schema";

interface SigInFieldProps {
    register: UseFormRegister<AuthInfoType>;
    handleSubmit: UseFormHandleSubmit<AuthInfoType>;
    errors: FieldErrorsImpl<DeepRequired<AuthInfoType>>;
    isSubmitting: boolean;
    onSubmit: SubmitHandler<AuthInfoType>;
}

export default function SignFields({
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
}: SigInFieldProps) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
                isInvalid={!!errors?.email || !!errors?.password}
                marginBottom="2em"
            >
                <VStack spacing={4}>
                    <Box>
                        <FormLabel>Email</FormLabel>
                        <Input
                            id="email"
                            placeholder="email"
                            {...register("email", { required: true })}
                            size="md"
                        ></Input>
                        {errors?.email && (
                            <FormErrorMessage>
                                {errors?.email?.message}
                            </FormErrorMessage>
                        )}
                    </Box>
                    <Box>
                        <FormLabel>Password</FormLabel>
                        <Input
                            id="password"
                            placeholder="password"
                            {...register("password")}
                            size="md"
                        ></Input>
                        {errors?.password && (
                            <FormErrorMessage>
                                {errors?.password?.message}
                            </FormErrorMessage>
                        )}
                    </Box>
                </VStack>
            </FormControl>
            <Button isLoading={isSubmitting} type="submit">
                Sign-in
            </Button>
        </form>
    );
}

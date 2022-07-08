import { z } from "zod";

const AuthInfo = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
});

export type AuthInfoType = z.infer<typeof AuthInfo>;

export { AuthInfo };

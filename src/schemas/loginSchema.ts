import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().nonempty("이메일을 입력해주세요."),
    password: z.string().nonempty("비밀번호를 입력해주세요."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

import { z } from "zod";

// 비밀번호 정규표현식
const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;

export const signupSchema = z
    .object({
        name: z.string().min(1, "이름을 입력해주세요."),

        username: z
            .email("이메일 형식에 맞게 입력해주세요.")
            .min(1, "이메일을 입력해주세요."),

        password: z
            .string()
            .min(1, "비밀번호를 입력해주세요.")
            .regex(
                PASSWORD_REGEX,
                "비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.",
            ),

        confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
    });

export type SignupFormValues = z.infer<typeof signupSchema>;

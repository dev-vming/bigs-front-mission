import { z } from "zod";

export const boardSchema = z.object({
    title: z.string().nonempty("제목을 입력해주세요."),
    content: z.string().nonempty("내용을 입력해주세요."),
    category: z.enum(["NOTICE", "FREE", "QNA", "ETC"], {
        message: "카테고리를 선택해주세요.",
    }),
    file: z.instanceof(File).optional(),
});

export type BoardFormValues = z.infer<typeof boardSchema>;

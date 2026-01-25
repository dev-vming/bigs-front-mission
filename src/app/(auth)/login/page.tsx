import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
    title: "로그인",
};

export default function LoginPage() {
    return (
        <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
            <LoginForm />
        </div>
    );
}

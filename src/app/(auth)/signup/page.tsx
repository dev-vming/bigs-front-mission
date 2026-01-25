import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
    return (
        <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
            <SignupForm />
        </div>
    );
}


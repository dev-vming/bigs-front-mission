import Modal from "@/components/common/Modal";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-dvh flex items-center justify-center bg-gray-50">
            {children}
            <Modal />
        </div>
    );
}

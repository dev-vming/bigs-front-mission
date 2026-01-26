interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

export default function ErrorMessage({
    message = "문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    onRetry,
}: ErrorMessageProps) {
    return (
        <div className="py-80 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-gray-600">{message}</p>

            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                >
                    다시 시도
                </button>
            )}
        </div>
    );
}

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-60 text-gray-500">
            <div className="w-10 h-10 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
    );
}

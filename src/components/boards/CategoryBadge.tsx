interface CategoryBadgeProps {
    category: "FREE" | "NOTICE" | "QNA" | "ETC";
}

const CATEGORY_STYLE: Record<string, string> = {
    FREE: "bg-blue-100 text-blue-600 ring-blue-500/10",
    NOTICE: "bg-red-100 text-red-600 ring-red-500/10",
    QNA: "bg-amber-100 text-amber-600 ring-amber-500/10",
    ETC: "bg-gray-100 text-gray-600 ring-gray-500/10",
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
    const style =
        CATEGORY_STYLE[category] ?? "bg-gray-100 text-gray-600 ring-gray-500/10";

    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ${style}`}
        >
            {category}
        </span>
    );
}

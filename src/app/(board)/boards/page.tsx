import { Suspense } from "react";
import BoardsClient from "./BoardsClient";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function BoardsPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <BoardsClient />
        </Suspense>
    );
}

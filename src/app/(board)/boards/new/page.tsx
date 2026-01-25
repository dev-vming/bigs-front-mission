import BoardForm from "@/components/boards/BoardForm";

export const metadata = {
    title: "게시물 등록",
};

export default function BoardNewPage() {
    return (
        <div>
            <BoardForm />
        </div>
    );
}


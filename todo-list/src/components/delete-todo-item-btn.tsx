"use client";
import deleteTodoItem from "../../actions/delete-todo-item";
import { useTransition } from "react";

type Props = {
    id: number
}

export const DeleteTodoItemBtn: React.FC<Props> = ({ id }) => {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (id: number) => {
        console.log("handle delete", id);
        startTransition(async () => {
            await deleteTodoItem(id);
        });
    }

    return (
        <button disabled={isPending}
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-3 py-1.5 text-center ms-1"
                onClick={() => {
                    if (confirm('Do you really want delete this todo item?')) {
                        handleDelete(id);
                    }
                }}>
            Delete
        </button>
    )
}

export default DeleteTodoItemBtn;
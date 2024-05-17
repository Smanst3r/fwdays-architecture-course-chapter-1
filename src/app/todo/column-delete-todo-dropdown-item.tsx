"use client";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {useEffect, useState, useTransition} from "react";
import deleteTodoItem from "@/../../actions/delete-todo-item";
import {TTodoItemGridData} from "@/app/todo/page";
// import { useToast } from "@/components/ui/use-toast";

// TODO: component is not updating with useState
const ColumnDeleteTodoDropdownItem: React.FC<{ todoItem: TTodoItemGridData }> = ({todoItem}) => {
    const [isPending, startTransition] = useTransition();
    const [deleteResult, setDeleteResult] = useState<{
        type: 'success' | 'error'
        text: string
    } | null>(null);
    // const [clearToastTimeout, setClearToastTimeout] = useState<NodeJS.Timeout | null>(null);
    // const { toast } = useToast();

    const handleDelete = (id: number) => {
        startTransition(async () => {
            const err = await deleteTodoItem(id);
            console.log("DELETE err", err)
            if (err) {
                setDeleteResult({
                    type: 'error',
                    text: err
                });
            } else {
                setDeleteResult({
                    type: 'success',
                    text: `The item #${todoItem.id} has been removed successfully`,
                });
            }
        });
    }

    // useEffect(() => {
    //     console.log("UPDATE ", deleteResult);
    //     if (deleteResult !== null) {
    //         toast({
    //             variant: deleteResult.type === 'error' ? 'destructive' : 'default',
    //             title: deleteResult.text,
    //             description: 'Test'
    //         });
    //     }
    // }, [deleteResult]);

    // automatically clear toast after timeout
    useEffect(() => {
        console.log("D ", deleteResult);
        if (deleteResult !== null) {
            alert(deleteResult);
            // clearToastTimeout && clearTimeout(clearToastTimeout);
            // setClearToastTimeout(setTimeout(() => {
            //     setDeleteResult(null);
            // }, 3000));
        }
    }, [deleteResult]);

    console.log("DEL RESULT ", deleteResult);

    return <>
        <DropdownMenuItem className="text-red-700 hover:text-red-700 focus:text-red-700"
                          disabled={isPending}
                          onClick={() => {
                              if (confirm(`Do you really want to remove "${todoItem.todo}" item?`)) {
                                  handleDelete(todoItem.id);
                              }
                          }}>
            Delete item
        </DropdownMenuItem>
    </>
}

export default ColumnDeleteTodoDropdownItem;
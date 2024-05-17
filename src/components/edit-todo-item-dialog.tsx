import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import Form from "@/components/form";
import {TPriority} from "../../utils/supabase/service";
import {Button} from "@/components/ui/button";
import {TTodoItemGridData} from "@/app/todo/page";
import {FaEye} from "react-icons/fa";

export default function EditTodoItemDialog({ priorities, todoItem }: {
    priorities: TPriority[]
    todoItem: TTodoItemGridData
}) {

    return <Dialog>
        <DialogTrigger className="font-medium text-blue-600 dark:text-blue-500 hover:underline" title="View todo item">
            <FaEye />
        </DialogTrigger>
        <DialogContent>
            <Form type="edit" priorities={priorities} todoItem={todoItem} FormFooter={<DialogClose asChild>
                <Button type="button" className="">
                    Close
                </Button>
            </DialogClose>} />
        </DialogContent>
    </Dialog>
}
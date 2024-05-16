import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import Form from "@/components/form";
import {TPriority, TTodo} from "../../utils/supabase/service";
import {Button} from "@/components/ui/button";

export default function EditTodoItemDialog({ priorities, formAction, todoItem }: {
    formAction: (formData: FormData) => void
    priorities: TPriority[]
    todoItem: TTodo
}) {

    return <Dialog>
        <DialogTrigger className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Open</DialogTrigger>
        <DialogContent>
            <Form action={formAction} priorities={priorities} todoItem={todoItem} FormFooter={<DialogClose asChild>
                <Button type="button" className="">
                    Close
                </Button>
            </DialogClose>} />
        </DialogContent>
    </Dialog>
}
import {createTodoItem} from "@/../../actions/add-todo-item";
import Form from "@/components/form";
import {fetchPriorities, fetchTodoItems, TPriority, TTodo} from "../../../utils/supabase/service";
import {DataTable} from "@/app/todo/data-table";
import {columns} from "@/app/todo/columns";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export type TTodoItemGridData = TTodo & { priorityData: TPriority|undefined };
export type TTodoGridData = TTodoItemGridData[];

export default async function Home() {
    const todoItems: TTodo[] = await fetchTodoItems();
    const priorities: TPriority[] = await fetchPriorities();

    // prepare data for grid
    const data: TTodoGridData = todoItems.map((item): TTodoItemGridData => {
        const priorityData = priorities.find(p => p.id === item.priority);
        return {...item, priorityData: priorityData };
    });

    return (
        <div className="">
            <div>
                <div className="w-1/3">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                &#43; Add new item
                            </AccordionTrigger>
                            <AccordionContent>
                                <Form action={createTodoItem} priorities={priorities} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div>
                    <DataTable columns={columns} data={data} priorities={priorities} />
                </div>
            </div>
        </div>
    )
}
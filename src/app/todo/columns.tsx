"use client";
import {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal, ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {TTodoItemGridData} from "@/app/todo/page";
import ColumnDeleteTodoDropdownItem from "@/app/todo/column-delete-todo-dropdown-item";
import {formatDate} from "../../../utils/utils";
import EditTodoItemDialog from "@/components/edit-todo-item-dialog";
import {editTodoItem} from "@/../../actions/todo-item";
import {TPriority} from "../../../utils/supabase/service";
import Link from "next/link";
import {RiExternalLinkFill} from "react-icons/ri";

const priorityClass = {
    'low': 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10',
    'medium': 'inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20',
    'high': 'inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10'
};

export const columns: ColumnDef<TTodoItemGridData>[] = [
    {
        accessorKey: 'todo',
        header: 'Title',
    },
    {
        accessorKey: 'is_accomplished',
        accessorFn: (gridItem) => gridItem.is_accomplished ? 'Finished' : 'In progress',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: 'priority',
        accessorFn: (gridItem) => gridItem.priorityData?.priority ?? 'n/a',
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Priority
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: (props) => {
            const priorityData = props.row.original.priorityData;
            if (!priorityData) {
                return 'n/a';
            }

            return <span className={priorityClass[priorityData.priority]}>{priorityData.priority}</span>
        },
        sortingFn: (rowA, rowB) => {
            // desc order
            const sortOrderA = rowA.original.priorityData?.sort ?? 0;
            const sortOrderB = rowB.original.priorityData?.sort ?? 0;
            return sortOrderB - sortOrderA;
        }
    },
    {
        accessorKey: 'deadline_at',
        accessorFn: (gridItem) => gridItem.deadline_at,
        cell: props => {
            const deadlineAt = props.row.original.deadline_at;
            const deadlineDate = new Date(deadlineAt);
            const todayDate = new Date();
            const millisecondLeft = deadlineDate.getTime() - todayDate.getTime();
            const daysLeft = Math.ceil(millisecondLeft / (1000 * 3600 * 24));
            const isDeadlineExpired = daysLeft < 0;

            return <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        {formatDate(deadlineDate)}
                        {isDeadlineExpired && <span className="text-red-700 text-xs"> expired</span>}
                    </TooltipTrigger>
                    <TooltipContent>
                        {deadlineAt}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        },
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Deadline
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({row, table}) => {
            const todoItem = row.original;
            const priorities = (table.options.meta ?? []) as TPriority[];

            return (
                <div className="flex items-center gap-2 justify-start text-lg">
                    <Link href={`/todo/${todoItem.id}`} target="_blank" rel="noopener noreferrer" title="Edit">
                        <RiExternalLinkFill style={{ display: 'inline' }} />
                    </Link>{' '}
                    <EditTodoItemDialog formAction={editTodoItem} priorities={priorities} todoItem={todoItem} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/todo/${todoItem.id}`)}>
                                Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <ColumnDeleteTodoDropdownItem todoItem={todoItem}/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
];
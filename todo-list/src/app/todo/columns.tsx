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
import {editTodoItem} from "../../../actions/add-todo-item";
import {TPriority} from "../../../utils/supabase/service";
import Link from "next/link";
import {RiExternalLinkFill} from "react-icons/ri";

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
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Priority
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
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
        cell: props => <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{formatDate(new Date(props.row.original.deadline_at))}</TooltipTrigger>
                <TooltipContent>
                    {props.row.original.deadline_at}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>,
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
                <div className="flex items-center gap-1 justify-start">
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
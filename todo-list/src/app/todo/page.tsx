import {createTodoItem, editTodoItem} from "../../../actions/add-todo-item";
import DeleteTodoItemBtn from "@/components/delete-todo-item-btn";
import {formatDate} from "../../../utils/utils";
import {PriorityBadge} from "@/components/priority-badge";
import Form from "@/components/form";
import Link from 'next/link';
import {fetchPriorities, fetchTodoItems, TPriority, TTodo} from "../../../utils/supabase/service";
import EditTodoItemDialog from "@/components/edit-todo-item-dialog";

export default async function Home() {
    const todoItems: TTodo[] = await fetchTodoItems();
    const priorities: TPriority[] = await fetchPriorities();

    return (
        <div className="min-h-screen flex justify-center">
            <div>
                <div>
                    <Form action={createTodoItem} priorities={priorities} />
                </div>
                <ul className="pt-5">
                    {todoItems.map(item => {
                        const priority = priorities.find(p => p.id === item.priority);
                        const deadlineDate = new Date(item.deadline_at);
                        const todayDate = new Date();
                        const millisecondLeft = deadlineDate.getTime() - todayDate.getTime();
                        const daysLeft = Math.ceil(millisecondLeft / (1000 * 3600 * 24));
                        const isDeadlineExpired = daysLeft < 0;

                        return <li key={item.id} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600" style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-50px' }}>
                                <Link href={`/todo/${item.id}`} passHref
                                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                </Link>
                            </div>
                            <div style={{ position: 'absolute', left: '-150px' }}>
                                <EditTodoItemDialog formAction={editTodoItem} priorities={priorities} todoItem={item} />
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="px-1 pe-1">
                                    {item.todo}
                                </span>
                                <span>
                                    <span className="text-xs text-gray-400">
                                        {item.is_accomplished && <span className="bg-green-100 text-green-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Accomplished</span>}
                                        {priority && <PriorityBadge priority={priority} />}
                                        <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${isDeadlineExpired ? 'bg-red-100 text-red-700' : ''}`}
                                              title={isDeadlineExpired ? 'Deadline is expired' : 'Deadline date'}>
                                            {isDeadlineExpired && <span>&times;</span>}{' '}
                                            {formatDate(deadlineDate)}
                                        </span>
                                    </span>
                                    <DeleteTodoItemBtn id={item.id} />
                                </span>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}
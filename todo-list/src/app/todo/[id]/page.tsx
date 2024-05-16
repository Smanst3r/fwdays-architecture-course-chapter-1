import {cookies} from "next/headers";
import {createClient} from "@/../utils/supabase/server";
import Form from "@/components/form";
import {editTodoItem} from "@/../actions/todo-item";
import {fetchPriorities, TTodo} from "@/../utils/supabase/service";
import HomeButton from "@/app/todo/[id]/home-button";

const fetchTodo = async (id: number) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const result = await supabase
        .from('todos')
        .select()
        .eq('id', id)
        .limit(1)
        .single();

    return result.data as TTodo;
}

export default async function Page(props: { params: { id: string } }) {
    const priorities = await fetchPriorities();
    const id = props.params.id;
    if (!id) {
        // TODO
        return <div>Unknown id </div>
    }
    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        // TODO
        return <div>Bad id </div>
    }

    const todoItem = await fetchTodo(todoId);
    if (!todoItem) {
        // TODO
        return <div>Not found todo item by id {todoId} </div>
    }

    return <>
        <h3><strong>Edit</strong> {todoItem.todo}</h3>
        <hr/>
        <div className="pt-2">
            <Form action={editTodoItem} priorities={priorities} todoItem={todoItem} FormFooter={<HomeButton>Go Home</HomeButton>} />
        </div>
    </>
}
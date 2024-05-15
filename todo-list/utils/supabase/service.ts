import {createClient} from "./server";
import {cookies} from "next/headers";

export type TTodo = {
    id: number
    todo: string
    description?: string
    created_at: string
    deadline_at: string
    priority: number
    is_accomplished: boolean
}

export type TPriority = {
    id: number
    priority: 'low'|'medium'|'high'
}

export const fetchPriorities = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const result = await supabase.from('priority').select();
    const priorities = result.data as TPriority[];
    return priorities ?? [];
}

export const fetchTodoItems = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const result = await supabase
        .from('todos')
        .select()
        .order('deadline_at', { ascending: true });
    const todos = result.data as TTodo[];
    return todos ?? [];
}

"use server";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";
import {cookies} from "next/headers";

const getFormValues = (formData: FormData) => {
    const id = formData.get('id');
    const title = formData.get('todo');
    const description = formData.get('description');
    const deadlineAt = formData.get('deadline_at');
    const priority = formData.get('priority');

    return { id, title, description, deadline_at: deadlineAt, priority };
}

export const createTodoItem = async (formData: FormData) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { title, description, deadline_at, priority } = getFormValues(formData);
    if (!title) {
        // TODO: title is required
        return;
    }

    const { data, error } = await supabase.from('todos').insert({
        todo: title,
        created_at: new Date().toISOString(),
        description: description,
        deadline_at: deadline_at,
        priority: priority,
    });

    revalidatePath('/todo');
}

export const editTodoItem = async (formData: FormData) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { id, title, description, deadline_at, priority } = getFormValues(formData);
    if (!title) {
        // TODO: title is required
        return;
    }

    const { data, error } = await supabase.from('todos').update({
        todo: title,
        description: description,
        deadline_at: deadline_at,
        priority: priority,
    }).match({ id: id });

    // revalidatePath(`/todo/${id}`);
    revalidatePath(`/todo`);
}

export const toggleItemAccomplishedStatus = async (todoItemId: number, isAccomplished: boolean) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    if (!todoItemId) {
        // TODO: bad todo item id
        return;
    }

    const { error, data } = await supabase.from('todos').update({
        is_accomplished: isAccomplished,
    }).match({ id: todoItemId });

    return error;
}
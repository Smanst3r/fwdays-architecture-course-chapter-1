"use server";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";
import {cookies} from "next/headers";

function getFormValues (formData: FormData) {
    const id = formData.get('id');
    const title = formData.get('todo');
    const description = formData.get('description');
    const deadlineAt = formData.get('deadline_at');
    const priority = formData.get('priority');

    return { id, title, description, deadline_at: deadlineAt, priority };
}

export async function createTodoItem (formData: FormData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { title, description, deadline_at, priority } = getFormValues(formData);
    if (!title) {
        return { error: 'Title is required' };
    }

    const { data, error } = await supabase.from('todos').insert({
        todo: title,
        created_at: new Date().toISOString(),
        description: description,
        deadline_at: deadline_at,
        priority: priority,
    });

    revalidatePath('/todo');
    // TODO: log full error
    return { error: error?.message ?? '' };
}

export async function editTodoItem (formData: FormData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { id, title, description, deadline_at, priority } = getFormValues(formData);
    if (!title) {
        return { error: 'Title is required' };
    }

    const { data, error } = await supabase.from('todos').update({
        todo: title,
        description: description,
        deadline_at: deadline_at,
        priority: priority,
    }).match({ id: id });

    revalidatePath(`/todo`);
    // TODO: log full error
    return { error: error?.message ?? '' };
}

export async function toggleItemAccomplishedStatus (todoItemId: number, isAccomplished: boolean) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    if (!todoItemId) {
        return { error: `Todo item id ${todoItemId} is invalid` };
    }

    const { error, data } = await supabase.from('todos').update({
        is_accomplished: isAccomplished,
    }).match({ id: todoItemId });

    return { error };
}
"use server";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";
import {cookies} from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export default async function deleteTodoItem(todoId: number) {
    console.log("TODO ID ", todoId);
    if (!todoId) {
        return;
    }

    const r = await supabase.from('todos').delete().eq('id', todoId);
    console.log("R ", r);

    revalidatePath('/todo');
}
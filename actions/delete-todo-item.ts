"use server";
import { createClient } from "../utils/supabase/server";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export default async function deleteTodoItem(todoId: number): Promise<string> {
    if (!todoId) {
        return `ID ${todoId} is invalid`;
    }

    const r = await supabase.from('todos').delete().eq('id', todoId);
    const errMessage = r.error?.message ?? '';
    if (!errMessage) {
        revalidatePath('/todo');
    }
    return errMessage;
}
"use client";
import {TPriority} from "../../utils/supabase/service";
import {formatDate} from "../../utils/utils";
import {TTodoItemGridData} from "@/app/todo/page";
import SubmitButton from "@/app/submit-button";
import {useState} from 'react';
import {createTodoItem, editTodoItem} from "../../actions/todo-item";

type TProps = {
    type: 'create' | 'edit'
    todoItem?: Omit<TTodoItemGridData, 'priorityData'> | undefined
    priorities: TPriority[]
    FormFooter?: React.ReactNode
}

type FormState = {
    loading: boolean
    error: string
    isOk: boolean
};

const initialState: FormState = {
    error: '',
    isOk: false,
    loading: false
};

const useFormAction = (action: (formData: FormData) => Promise<{ error: string }>, initialState: FormState) => {
    const [state, setState] = useState<FormState>(initialState);

    const formAction = async (formData: FormData) => {
        setState({error: '', loading: true, isOk: false});
        try {
            const result = await action(formData);
            setState({loading: false, error: result.error, isOk: Boolean(!result.error)});
        } catch (error) {
            setState({loading: false, error: 'An unexpected error occurred', isOk: false});
        }
    };

    return [state, formAction] as const;
};

export const Form: React.FC<TProps> = ({type, todoItem, priorities, FormFooter}) => {
    const [state, formAction] = useFormAction(type === 'create' ? createTodoItem : editTodoItem, initialState);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        await formAction(formData);
    };

    return <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={todoItem && todoItem.id}/>
        <label htmlFor="todo" className="">Title {}</label>
        <input type="text"
               name="todo"
               disabled={state.loading}
               id="todo"
               placeholder="Title..."
               required
               defaultValue={todoItem && todoItem.todo}
               className="w-full text-grey-darker"/>
        <div className="mt-2">
            <label htmlFor="description">Description</label>
            <textarea name="description"
                      id="description"
                      disabled={state.loading}
                      cols={30}
                      rows={4}
                      defaultValue={todoItem && todoItem.description}
                      className="w-full"></textarea>
        </div>
        <div className="flex mt-2 gap-5">
            <div>
                <label htmlFor="deadline" className="block">
                    Deadline at
                </label>
                <input type="date"
                       id="deadline"
                       name="deadline_at"
                       disabled={state.loading}
                       defaultValue={todoItem && formatDate(new Date(todoItem.deadline_at), 'yyyy-mm-dd')}
                       required/>
            </div>
            <div>
                <label htmlFor="deadline" className="block">
                    Priority
                </label>
                <select name="priority" id="priority" defaultValue={todoItem && todoItem.priority}
                        disabled={state.loading}>
                    {priorities.map(p => {
                        return <option key={p.id} value={p.id}>{p.priority}</option>
                    })}
                </select>
            </div>
        </div>
        <div className={`rounded p-2 mt-2 min-h-10 ${state.error ? 'text-red-700 bg-red-200 rounded' : ''} ${state.isOk ? 'bg-green-200 text-green-800' : ''}`}>
            {state.error || state.isOk && <span>
                {state.error || 'Todo item saved successfully'}
            </span>}
        </div>
        <SubmitButton>
            {todoItem ? 'Save todo' : 'Add todo'}
        </SubmitButton>
        {FormFooter && FormFooter}
    </form>
};

export default Form;
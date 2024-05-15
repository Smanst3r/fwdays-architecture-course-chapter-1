import {TPriority, TTodo} from "../../utils/supabase/service";
import {formatDate} from "../../utils/utils";

type TProps = {
    action: (formData: FormData) => void
    todoItem?: TTodo|undefined
    priorities: TPriority[]
}

export const Form: React.FC<TProps> = ({ action, todoItem, priorities }) => {

    return <form action={action} method="POST" className="">
        <input type="hidden" name="id" value={todoItem && todoItem.id} />
        <label htmlFor="todo" className="">Title</label>
        <input type="text"
               name="todo"
               id="todo"
               placeholder="Title..."
               required
               defaultValue={todoItem && todoItem.todo}
               className="w-full text-grey-darker" />
        <div className="mt-2">
            <label htmlFor="description">Description</label>
            <textarea name="description"
                      id="description"
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
                       defaultValue={todoItem && formatDate(new Date(todoItem.deadline_at), 'yyyy-mm-dd')}
                       required />
            </div>
            <div>
                <label htmlFor="deadline" className="block">
                    Priority
                </label>
                <select name="priority" id="priority">
                    {priorities.map(p => {
                        return <option key={p.id} value={p.id}>{p.priority}</option>
                    })}
                </select>
            </div>
        </div>
        <button type="submit"
                className="text-white mt-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {todoItem ? 'Save todo' : 'Add todo'}
        </button>
    </form>
};

export default Form;
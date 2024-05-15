import { TPriority } from "@/../utils/supabase/service";

type TProps = {
    priority: TPriority
}

const priorityToClass: { [key in TPriority['priority']]: string } = {
    'low': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'high': 'bg-pink-100 text-pink-800 rounded dark:bg-pink-900 dark:text-pink-300'
};

export const PriorityBadge: React.FC<TProps> = ({ priority }) => {
    const priorityClass = priorityToClass[priority?.priority ?? 'low'];
    return <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${priorityClass}`}>
        {priority?.priority}
    </span>
}
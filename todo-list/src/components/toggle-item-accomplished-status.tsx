"use client";
import {useState} from "react";
import {toggleItemAccomplishedStatus} from "@/../actions/todo-item";
import {TTodoItemGridData} from "@/app/todo/page";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ToggleItemAccomplishedStatus({ todoItem }: {
    todoItem: TTodoItemGridData
}) {
    const [isChecked, setIsChecked] = useState<boolean>(todoItem.is_accomplished);

    return <span>
        <Switch id={`switch-status-${todoItem.id}`}
                className="align-middle"
                defaultChecked={todoItem.is_accomplished}
                onClick={async (event) => {
                    const newIsChecked = !isChecked;
                    const err = await toggleItemAccomplishedStatus(todoItem.id, newIsChecked);
                    if (err) {
                        // TODO: handle error
                        event.preventDefault();
                        return;
                    }
                    setIsChecked(newIsChecked);
                }} />
        {' '}<Label htmlFor={`switch-status-${todoItem.id}`}>{isChecked ? 'Finished' : 'In progress'}</Label>
    </span>
}
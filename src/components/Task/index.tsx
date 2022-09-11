import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { TaskState } from "../../store/slices/types";
import { useAppDispatch } from "../../hooks";
import { removeTask } from "../../store/slices/taskSlice";

import "./Task.scss";

interface TaskProps {
  group: TaskState;
  indexGroup: number;
}

const Task: FC<TaskProps> = ({ group, indexGroup }) => {
  const dispatch = useAppDispatch();

  const handleRemoveTask = (
    event: React.MouseEvent<HTMLDivElement>,
    taskId: number,
    groupId: number
  ) => {
    if (event.ctrlKey) {
      dispatch(removeTask({ taskId, groupId }));
    }
  };

  return (
    <React.Fragment>
      {group.tasks.map((task, index) => (
        <Draggable key={task.dragId} draggableId={task.dragId} index={index}>
          {(provided, snapshot) => (
            <div
              className="item"
              onClick={(event) => handleRemoveTask(event, task.id, indexGroup)}
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div className="item__title" {...provided.dragHandleProps}>
                {task.text}
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </React.Fragment>
  );
};

export default Task;

import React from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useAppDispatch, useAppSelector } from "./hooks";
import { updateGroup, updateTask } from "./store/slices/taskSlice";
import { ITask, TaskState } from "./store/slices/types";
import Group from "./components/Group";

import "./App.scss";

const onDragEnd = (result: any, taskData: TaskState[], dispatch: Dispatch) => {
  if (!result.destination) return;

  if (result.type === "group") {
    const group: TaskState[] = Array.from(taskData);
    const [reorderedItem] = group.splice(result.source.index, 1);
    group.splice(result.destination.index, 0, reorderedItem);

    dispatch(updateGroup(group));
  } else {
    const group: TaskState = taskData[result.source.droppableId];
    const groupDest: TaskState = taskData[result.destination.droppableId];
    let res;

    const restTaskInGroup = [...group.tasks];
    const newTaskGroup = [...groupDest.tasks];
    const selectedTask = [...group.tasks][result.source.index];

    restTaskInGroup.splice(result.source.index, 1);
    newTaskGroup.splice(result.destination.index, 0, selectedTask);

    if (result.source.droppableId !== result.destination.droppableId) {
      res = {
        ...taskData,
        [result.source.droppableId]: { ...group, tasks: restTaskInGroup },
        [result.destination.droppableId]: {
          ...groupDest,
          tasks: newTaskGroup,
        },
      };
    } else {
      const group: ITask[] = taskData[result.destination.droppableId].tasks;
      const groupCopy = [...group];
      const [reorderedItem] = groupCopy.splice(result.source.index, 1);
      groupCopy.splice(result.destination.index, 0, reorderedItem);

      res = {
        ...taskData,
        [result.destination.droppableId]: {
          ...groupDest,
          tasks: groupCopy,
        },
      };
    }

    dispatch(updateTask(res));
  }
};

function App() {
  const dispatch = useAppDispatch();
  const { taskData } = useAppSelector((state) => state.taskSlice);

  return (
    <div className="App">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, taskData, dispatch)}
      >
        <Droppable droppableId="group" type="group" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className="group"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Group taskData={taskData} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;

import React, { SetStateAction } from "react";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./hooks";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Dispatch } from "@reduxjs/toolkit";
import { updateGroup, updateTask } from "./store/slices/taskSlice";
import { InitialState, TaskState } from "./store/slices/types";
import Group from "./components/Group";

const onDragEnd = (result: any, taskData: any, dispatch: Dispatch) => {
  if (!result.destination) return;

  if (result.type === "group") {
    const group: TaskState[] = Array.from(taskData);
    const [reorderedItem] = group.splice(result.source.index, 1);
    group.splice(result.destination.index, 0, reorderedItem);

    dispatch(updateGroup(group));
  } else {
    const group: any = taskData[result.source.droppableId];
    const groupDest: any = taskData[result.destination.droppableId];

    const withTaskRemoved = [...group.tasks];
    const withTask = [...group.tasks][result.source.index];

    withTaskRemoved.splice(result.source.index, 1);

    const res = {
      ...taskData,
      [result.source.droppableId]: { ...group, tasks: withTaskRemoved },
      [result.destination.droppableId]: {
        ...groupDest,
        tasks: [...groupDest.tasks, withTask],
      },
    };

    console.log(Object.values(res));

    dispatch(updateTask(res));
  }
};

function App() {
  const dispatch = useAppDispatch();
  // const [activeItem, setActiveItem] = React.useState(false);
  const { taskData } = useAppSelector((state) => state.taskSlice);

  console.log(taskData);

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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { InitialState, TaskState } from "./types";

const initialState: InitialState = {
  taskData: [
    {
      groupId: nanoid(),
      groupName: "Jake",
      groupCreatedAt: new Date(),
      isAdded: false,
      tasks: [
        {
          id: Math.random(),
          dragId: nanoid(),
          text: "First Task",
          editable: false,
        },
        {
          id: Math.random(),
          dragId: nanoid(),
          text: "First Task 1",
          editable: false,
        },
      ],
    },
    {
      groupId: nanoid(),
      groupName: "Elian",
      groupCreatedAt: new Date(),
      isAdded: false,
      tasks: [
        {
          id: Math.random(),
          dragId: nanoid(),
          text: "Second Task",
          editable: false,
        },
        {
          id: Math.random(),
          dragId: nanoid(),
          text: "Second Task 1",
          editable: false,
        },
        {
          id: Math.random(),
          dragId: nanoid(),
          text: "Second Task 2",
          editable: false,
        },
      ],
    },
    {
      groupId: nanoid(),
      groupName: "Mike",
      groupCreatedAt: new Date(),
      isAdded: false,
      tasks: [
        {
          id: Math.random(),
          dragId: nanoid(),
          text: "Third Task",
          editable: false,
        },
        {
          id: Math.random(),
          dragId: nanoid(),
          text: "Third Task 1",
          editable: false,
        },
        {
          id: Math.random(),
          dragId: nanoid(),
          text: "Third Task 1 ",
          editable: false,
        },
        {
          id: Math.random(),
          dragId: nanoid(),
          text: "Third Task 1",
          editable: false,
        },
        {
          id: Math.random(),
          dragId: nanoid(),
          text: "Third Task 1",
          editable: false,
        },
      ],
    },
  ],
};

export const taskSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addNewTask(
      state,
      action: PayloadAction<{ inputValue: string; id: number }>
    ) {
      state.taskData[action.payload.id].tasks.push({
        id: Math.random(),
        dragId: nanoid(),
        text: action.payload.inputValue,
        editable: false,
      });
    },
    removeTask(
      state,
      action: PayloadAction<{ taskId: number; groupId: number }>
    ) {
      state.taskData[action.payload.groupId].tasks = state.taskData[
        action.payload.groupId
      ].tasks.filter((task) => task.id !== action.payload.taskId);
    },
    updateTask(state, action: PayloadAction<TaskState[]>) {
      state.taskData = Object.values(action.payload);
    },
    updateGroup(state, action: PayloadAction<TaskState[]>) {
      state.taskData = action.payload;
    },
    removeGroup(state, action: PayloadAction<string>) {
      state.taskData = state.taskData.filter(
        (group) => group.groupId !== action.payload
      );
    },
    isAddedTrue(state, action: PayloadAction<number>) {
      state.taskData[action.payload].isAdded = true;
    },
    isAddedFalse(state, action: PayloadAction<number>) {
      state.taskData[action.payload].isAdded = false;
    },
    editTask(state) {},
  },
});

export const {
  addNewTask,
  removeTask,
  editTask,
  updateGroup,
  updateTask,
  isAddedTrue,
  isAddedFalse,
  removeGroup,
} = taskSlice.actions;

export default taskSlice.reducer;

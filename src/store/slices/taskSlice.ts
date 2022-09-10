import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { InitialState, TaskState } from "./types";

const initialState: InitialState = {
  taskData: [
    {
      groupId: nanoid(),
      groupName: "Jake",
      groupCreatedAt: new Date(),
      tasks: [
        {
          id: 1,
          dragId: nanoid(),
          text: "First Task",
          editable: false,
        },
        {
          id: 2,
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
      tasks: [
        {
          id: 3,
          dragId: nanoid(),
          text: "Second Task",
          editable: false,
        },
        {
          id: 4,
          dragId: nanoid(),
          text: "Second Task 1",
          editable: false,
        },
        {
          id: 5,
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
      tasks: [
        {
          id: 6,
          dragId: nanoid(),
          text: "Third Task",
          editable: false,
        },
        {
          id: 7,
          dragId: nanoid(),
          text: "Third Task 1",
          editable: false,
        },
        {
          id: 9,
          dragId: nanoid(),
          text: "Third Task 1 ",
          editable: false,
        },
        {
          id: 9,
          dragId: nanoid(),
          text: "Third Task 1",
          editable: false,
        },
        {
          id: 10,
          dragId: nanoid(),
          text: "Third Task 1",
          editable: false,
        },
      ],
    },
  ],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addNewTask(state) {},
    updateGroup(state, { payload }: PayloadAction<TaskState[]>) {
      state.taskData = payload;
    },
    updateTask(state, { payload }: PayloadAction<TaskState[]>) {
      state.taskData = Object.values(payload);
    },
    removeItem(state) {},
    editTask(state) {},
  },
});

export const { addNewTask, removeItem, editTask, updateGroup, updateTask } =
  taskSlice.actions;

export default taskSlice.reducer;

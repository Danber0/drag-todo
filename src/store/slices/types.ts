export interface Task {
  id: number;
  dragId: string;
  text: string;
  editable: boolean;
}

export interface TaskState {
  groupId: string;
  groupName: string;
  tasks: Task[];
}

export interface InitialState {
  taskData: TaskState[];
}

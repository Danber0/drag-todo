export interface ITask {
  id: number;
  dragId: string;
  text: string;
  editable: boolean;
}

export interface TaskState {
  groupId: string;
  groupName: string;
  groupCreatedAt: Date;
  isAdded: boolean;
  tasks: ITask[];
}

export interface InitialState {
  taskData: TaskState[];
}

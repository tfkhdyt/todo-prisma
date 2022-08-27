import { User } from './user.d';

export interface Task {
  id: string;
  taskName: string;
  isDone: boolean;
  user: User;
}

import { Task } from './task';

export interface User {
  id: string;
  name: string;
  email: string;
  tasks: Task[];
}

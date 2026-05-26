import LocalStorageLib from "use-local-storage";
import { TASKS_KEY } from "../models/task";
import type { Task } from "../models/task";

type UseLocalStorage = <T>(
  key: string,
  defaultValue: T,
  options?: unknown
) => [T, (value: T) => void, () => void];

const useLocalStorage = (
  LocalStorageLib as unknown as { default: UseLocalStorage }
).default;

export default function useTasks() {
  const [tasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

  return {
    tasks,
    tasksCount: tasks.length,
    concludedTasksCount: tasks.filter((task) => task.concluded).length,
  };
}
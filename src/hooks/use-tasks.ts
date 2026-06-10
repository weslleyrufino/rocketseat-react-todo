import LocalStorageLib from "use-local-storage";
import { TASKS_KEY, TaskState } from "../models/task";
import type { Task } from "../models/task";
import React from "react";
import { delay } from "../helpers/utils";

type UseLocalStorage = <T>(
  key: string,
  defaultValue: T,
  options?: unknown
) => [T, (value: T) => void, () => void];

const useLocalStorage = (
  LocalStorageLib as unknown as { default: UseLocalStorage }
).default;

export default function useTasks() {
  const [tasksData] = useLocalStorage<Task[]>(TASKS_KEY, []);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = React.useState(true);

  async function fetchTasks() {
    console.time("Carregando tarefas...");
    if(isLoadingTasks){
      await delay(2000);
      setIsLoadingTasks(false);
    }

    setTasks(tasksData);
    console.timeEnd("Tarefas carregadas!");
  }

  React.useEffect(() => {
    fetchTasks();
  }, [tasksData]);

  return {
    tasks,
    createdTasksCount: tasks.filter((task) => task.state === TaskState.Created).length,
    concludedTasksCount: tasks.filter((task) => task.concluded).length,
    isLoadingTasks
  };
}
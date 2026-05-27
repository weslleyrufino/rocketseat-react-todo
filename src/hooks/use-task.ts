import LocalStorageLib from "use-local-storage";
import { TASKS_KEY, TaskState, type Task } from "../models/task";


type UseLocalStorage = <T>(
  key: string,
  defaultValue: T,
  options?: unknown
) => [T, (value: T) => void, () => void];

const useLocalStorage = (
  LocalStorageLib as unknown as { default: UseLocalStorage }
).default;

export default function useTask() {
    const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

    function prepareTask(){
        setTasks([...tasks, {
            id: Math.random().toString(36).substring(2, 9),
            title: "",
            state: TaskState.Creating
        }]);
    }

    function updateTask(id: string, payload: {title: Task["title"]}){
        setTasks(
            tasks.map((task) => task.id === id ? {
                ...task, state: TaskState.Created, ...payload
            } : task) // Vou mapear aqui, para que quando for o meu id, eu vou atualizar o indice do array.
        )
    }

    function updateTaskStatus(id: string, concluded: boolean){
        setTasks(
            tasks.map((task) => task.id === id ? {...task, concluded} : task) // Vou mapear aqui, para que quando for o meu id, eu vou atualizar o indice do array.
        )
    }

    return {
        prepareTask,
        updateTask,
        updateTaskStatus
    }
}
import LocalStorageLib from "use-local-storage";
import { TASKS_KEY, TaskState, type Task } from "../models/task";
import { delay } from "../helpers/utils";
import React from "react";


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
    const [isUpdatingTask, setIsUpdatingTask] = React.useState(false);
    const [isDeletingTask, setIsDeletingTask] = React.useState(false);

    function prepareTask(){
        setTasks([...tasks, {
            id: Math.random().toString(36).substring(2, 9),
            title: "",
            state: TaskState.Creating
        }]);
    }

    async function updateTask(id: string, payload: {title: Task["title"]}){
    
        setIsUpdatingTask(true);
        await delay(1000); // Simulando uma requisição assíncrona, como uma chamada a uma API.

        setTasks(
            tasks.map((task) => task.id === id ? {
                ...task, state: TaskState.Created, ...payload
            } : task) // Vou mapear aqui, para que quando for o meu id, eu vou atualizar o indice do array.
        )
        setIsUpdatingTask(false);
    }

    function updateTaskStatus(id: string, concluded: boolean){
        setTasks(
            tasks.map((task) => task.id === id ? {...task, concluded} : task) // Vou mapear aqui, para que quando for o meu id, eu vou atualizar o indice do array.
        )
    }

    async function deleteTask(id: string){
        setIsDeletingTask(true);
        
        await delay(1000); // Simulando uma requisição assíncrona, como uma chamada a uma API.
        
        setTasks(tasks.filter((task) => task.id !== id));

        setIsDeletingTask(false);
    }

    return {
        prepareTask,// Essa função é responsável por preparar uma nova tarefa, ou seja, criar uma nova tarefa com um id aleatório, um título vazio e um estado de criação, e adicionar essa tarefa ao array de tarefas.
        updateTask,
        updateTaskStatus,
        deleteTask,
        isUpdatingTask,
        isDeletingTask,
    }
}
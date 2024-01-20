import { supabase } from "../utils/supabase";
import { Todo } from "./interface";

export const getAllTodos = async (): Promise<Todo[]> => {
    const { data, error } = await supabase.from("todo").select("*");
    
    if (error) {
        throw error;
    }

    return data;
};

export const addTodo = async (title: string) => {
    await supabase.from("todo").insert({title: title});
};

export const updateTodoStatus = async (id: number, isCompleted: boolean) => {
    const { data, error } = await supabase
        .from('todo')
        .update({ isCompleted })
        .match({ id });

    if (error) {
        throw error;
    }

    return data;
};

export const deleteTodo = async (id: number) => {
    try {
        console.log("Deleting todo with id:", id);
        const { data, error } = await supabase.from("todo").delete().eq("id", id);

        if (error) {
            console.error("Error deleting todo:", error);
            return false;
        }

        console.log("Deleted todo:", data);
        return true;
    } catch (error) {
        console.error("Unexpected error deleting todo:", error);
        return false;
    }
};
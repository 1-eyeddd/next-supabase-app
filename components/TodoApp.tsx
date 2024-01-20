"use client"; 
import React, { useEffect, useState } from 'react';
import TodoList from './TodoList'
import { getAllTodos, updateTodoStatus, addTodo, deleteTodo } from '@/utils/supabaseFunctions';
import { Todo } from '@/utils/interface'; 
import { title } from 'process';

const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
      const fetchTodos = async () => {
        const fetchedTodos = await getAllTodos();
        setTodos(fetchedTodos);
      };
  
      fetchTodos();
    }, []);

    const handleToggleCompleted = async (id: number, completed: boolean) => {
      try {
        await updateTodoStatus(id, completed);
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isCompleted: completed } : todo));
      } catch (error) {
        console.error('Error updating todo status:', error);
      }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await addTodo(title);
        let todos = await getAllTodos();
        setTodos(todos);
        setTitle("");
    };

    const handleDelete = async (id: number) => {
        try {
          await deleteTodo(id);
          setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      };

  return (
    <section className='text-center mb-2 text-2xl font-medium'>
        <h3>Supabase Todo App</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" className='shadow-lg p-1 outline-none' onChange={(e) => setTitle(e.target.value)} value={title}/>
            <button className='shadow-md border-2 px-1 py-1 ml-4 rounded-lg bg-green-500'>Add</button>
        </form>
        <TodoList todos={todos} onToggleCompleted={handleToggleCompleted} onDelete={handleDelete} />
    </section>
  )
}

export default TodoApp;
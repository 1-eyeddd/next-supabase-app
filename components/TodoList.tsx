// @client
import React from 'react';
import { Todo } from '@/utils/interface';

type TodoListProps = {
    todos: Todo[];
    onToggleCompleted: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void; 
};

const TodoList = ({ todos, onToggleCompleted, onDelete }: TodoListProps) => {
    return (
      <div>
        <ul className='mx-auto'>
          {todos.map((todo) => (
            <div key={todo.id} className='flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between'>
              <li className='font-medium'>
                <input 
                  type="checkbox" 
                  checked={!!todo.isCompleted} 
                  onChange={(e) => onToggleCompleted(todo.id, e.target.checked)}
                />{' '}
                {todo.title}
              </li>
              <span className='cursor-pointer' onClick={() => onDelete(todo.id)}>×</span>
            </div>
          ))}
        </ul>
      </div>
    );
  };
export default TodoList;

import { Injectable } from '@angular/core';
import { TodoDto } from '../types/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoHttpService {
  private baseUrl = 'http://localhost:3000/todos';

  async getAll(): Promise<TodoDto[]> {
    const response = await fetch(this.baseUrl, { mode: 'cors' });
    const todos = await response.json();
    return todos as TodoDto[];
  }

  async getById(id: number): Promise<TodoDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    const todo = await response.json();
    return todo as TodoDto;
  }

  async create(todo: TodoDto): Promise<TodoDto> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    const createdTodo = await response.json();
    return createdTodo as TodoDto;
  }

  async update(id: number, todo: TodoDto): Promise<TodoDto> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    const updatedTodo = await response.json();
    return updatedTodo as TodoDto;
  }

  async delete(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' });
  }
}

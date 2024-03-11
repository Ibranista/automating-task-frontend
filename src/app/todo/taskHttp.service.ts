import { Injectable } from '@angular/core';
import { TaskDto } from '../types/todo';

@Injectable({
  providedIn: 'root',
})
export class TaskHttpService {
  private baseUrl = 'http://localhost:3000/tasks';

  async getAll(): Promise<TaskDto[]> {
    const response = await fetch(this.baseUrl);
    const tasks = await response.json();
    return tasks as TaskDto[];
  }

  async getById(id: number): Promise<TaskDto> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    const task = await response.json();
    return task as TaskDto;
  }

  async create(task: TaskDto): Promise<TaskDto> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const createdTask = await response.json();
    return createdTask as TaskDto;
  }

  async update(id: number, task: TaskDto): Promise<TaskDto> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const updatedTask = await response.json();
    return updatedTask as TaskDto;
  }

  async delete(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, { method: 'DELETE' });
  }
}

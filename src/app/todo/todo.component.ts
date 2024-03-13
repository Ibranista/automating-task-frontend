import { Component } from '@angular/core';
import { CreateToDoComponent } from './createTodo.component';
import { MatDialog } from '@angular/material/dialog';
import { TodoDto } from '../types/todo';
import { TodoHttpService } from './todoHttp.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  constructor(
    private dialog: MatDialog,
    private todoHttpService: TodoHttpService
  ) {
    this.fetchData();
  }

  displayedColumns: string[] = [
    'no',
    'name',
    'description',
    'tasks',
    'edit',
    'completed',
    'delete',
  ];

  todos: TodoDto[] = [];
  dataSource = this.todos;

  async openQueryModal(): Promise<string> {
    const dialogRef = this.dialog.open(CreateToDoComponent, {
      width: '400px',
      height: '500px',
    });

    const { name, description } = await dialogRef.afterClosed().toPromise();

    const newTodoDto: TodoDto = {
      name,
      description,
      isActive: true,
      tasks: [],
    };

    const res = await this.todoHttpService.create(newTodoDto);

    this.fetchData();
    return '';
  }

  fetchData() {
    this.todoHttpService.getAll().then((data: TodoDto[]) => {
      this.todos = data;
      this.dataSource = this.todos;
    });
  }

  async deleteTodo(id: number) {
    await this.todoHttpService.delete(id);
    this.fetchData();
  }

  async markIsComplete(isCompleted: boolean, name: string) {
    // await this.todoHttpService.delete(id);
    // console.log(isCompleted, name);
    let index = this.todos.findIndex((item) => item.name === name);
    let item = this.todos.splice(index, 1)[0];
    item.isCompleted = isCompleted;
    this.todos.splice(index, 0, item);
    await this.todoHttpService.updateIsCompleted(name, { isCompleted });
    this.fetchData();
  }
}

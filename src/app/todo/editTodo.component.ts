import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from './createTask.component';
import { TaskDto, TodoDto } from '../types/todo';
import { TodoHttpService } from './todoHttp.service';
import { TaskHttpService } from './taskHttp.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-todo',
  templateUrl: './editTodo.component.html',
  // styleUrl: './editTodo.component.scss',
})
export class EditTodoComponent {
  todo: TodoDto = {
    id: 1,
    isActive: true,
    name: '',
    description: '',
    tasks: [],
  };

  constructor(
    private dialog: MatDialog,
    private todoHttpService: TodoHttpService,
    private taskHttpService: TaskHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.fetchTodo(id as number);
    });
  }
  async fetchTodo(id: number) {
    const el = await this.todoHttpService.getById(id);
    this.todo = el;
    console.log('get single ', el);
    this.applyForm.setValue({ name: el.name, description: el.description });
    this.dataSource = el.tasks;
  }

  applyForm = new FormGroup({
    name: new FormControl(this.todo.name),
    description: new FormControl(this.todo.description),
  });

  displayedColumns: string[] = ['no', 'name', 'edit', 'delete'];
  dataSource = this.todo.tasks;

  async updateTodo() {
    const updatedTodo: TodoDto = {
      name: this.applyForm.value.name,
      description: this.applyForm.value.description,
      isActive: true,
    };

    const res = await this.todoHttpService.update(this.todo.id, updatedTodo);
    console.log('update tdo = ?', res);
  }

  async openQueryModal() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '400px',
      height: '300px',
    });

    const { name } = await dialogRef.afterClosed().toPromise();

    const newTaskDto: TaskDto = {
      name,
      isActive: true,
      todo: this.todo.id,
    };

    const res = await this.taskHttpService.create(newTaskDto);
    this.fetchTodo(this.todo.id);
    console.log(' task name kkk', name, 'cc', res);
    return '';
  }

  async deleteTask(id: number) {
    await this.taskHttpService.delete(id);
    this.fetchTodo(this.todo.id);
  }
}

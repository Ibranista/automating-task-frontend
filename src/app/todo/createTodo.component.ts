import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'create-todo-modal',
  template: `
    <h2 mat-dialog-title>Add Todo</h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>Todo Name</mat-label>
        <input matInput #todoNameInput placeholder="todo Name" required />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Todo Description</mat-label>
        <textarea
          rows="5"
          width="80%"
          matInput
          #descriptionNameInput
          placeholder="description"
          required
        ></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button
        mat-button
        color="primary"
        (click)="onSubmit(todoNameInput.value, descriptionNameInput.value)"
      >
        Add
      </button>
    </mat-dialog-actions>
  `,
})
export class CreateToDoComponent {
  constructor(private dialogRef: MatDialogRef<CreateToDoComponent>) {}

  onSubmit(todoName: string, todoDescription: string | null) {
    this.dialogRef.close({ name: todoName, description: todoDescription });
  }
}

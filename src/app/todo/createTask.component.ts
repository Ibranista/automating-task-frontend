import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'create-task-modal',
  template: `
    <h2 mat-dialog-title>Add Task</h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>Task Name</mat-label>
        <input matInput #taskNameInput placeholder="task Name" required />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button
        mat-button
        color="primary"
        (click)="onSubmit(taskNameInput.value)"
      >
        Add
      </button>
    </mat-dialog-actions>
  `,
})
export class CreateTaskComponent {
  constructor(private dialogRef: MatDialogRef<CreateTaskComponent>) {}

  onSubmit(taskName: string) {
    this.dialogRef.close({ name: taskName });
  }
}

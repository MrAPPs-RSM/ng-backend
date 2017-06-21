import { Component } from '@angular/core';

import { DefaultEditor } from './default-editor';

@Component({
  selector: 'input-editor',
  styleUrls: ['./editor.component.scss'],
  template: `
    <div class="form-group has-feedback" [class.has-error]="field.errors && (field.dirty || field.touched)" style="margin-bottom: 0;">
      <input #field="ngModel"
        [ngClass]="inputClass"
        class="form-control"
        [(ngModel)]="cell.newValue"
        [name]="cell.getId()"
        [placeholder]="cell.getTitle()"
        [disabled]="!cell.isEditable()"
        (click)="onClick.emit($event)"
        (keydown.enter)="onEdited.emit($event)"
        (keydown.esc)="onStopEditing.emit()"
        [required]="cell.getColumn().getConfig()?.required"
        [minlength]="cell.getColumn().getConfig()?.minLength"
        [maxlength]="cell.getColumn().getConfig()?.maxLength"
        [pattern]="cell.getColumn().getConfig()?.pattern">
      <div *ngIf="field.errors && (field.dirty || field.touched)">
        <icon-error-tooltip
            content="Поле обязательно для заполнения"
            *ngIf="field.hasError('required')"></icon-error-tooltip>          
        <icon-error-tooltip
            content="Поле должно содержать не менее {{cell.getColumn().getConfig()?.minLength}} знаков"
            *ngIf="field.hasError('minlength')"></icon-error-tooltip>          
        <icon-error-tooltip
            content="Поле должно содержать не более {{cell.getColumn().getConfig()?.maxLength}} знаков"
            *ngIf="field.hasError('maxlength')"></icon-error-tooltip>          
        <icon-error-tooltip
            content="Значение поля не соответствует образцу"
            *ngIf="field.hasError('pattern')"></icon-error-tooltip>
      </div>
    </div>
    `,
})
export class InputEditorComponent extends DefaultEditor {
  constructor() {
    super();
  }
}

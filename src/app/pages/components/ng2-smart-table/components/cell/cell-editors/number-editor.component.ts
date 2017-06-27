import { Component } from '@angular/core';

import { DefaultEditor } from './default-editor';

@Component({
  selector: 'number-editor',
  styleUrls: ['./editor.component.scss'],
  template: `
    <div class="form-group has-feedback" [class.has-error]="field.errors && (field.dirty || field.touched)" style="margin-bottom: 0;">
      <input #field="ngModel"
           [ngClass]="inputClass"
           type="number"
           class="form-control"
           [(ngModel)]="cell.newValue"
           [name]="cell.getId()"
           [placeholder]="cell.getTitle()"
           [disabled]="!cell.isEditable()"
           (click)="onClick.emit($event)"
           (keydown.enter)="onEdited.emit($event)"
           (keydown.esc)="onStopEditing.emit()"
           [required]="cell.getColumn().getConfig()?.required"
           [attr.min]="cell.getColumn().getConfig()?.min"
           [min]="cell.getColumn().getConfig()?.min"
           [attr.max]="cell.getColumn().getConfig()?.max"
           [max]="cell.getColumn().getConfig()?.max">      
      <div *ngIf="field.errors && (field.dirty || field.touched)">
        <icon-error-tooltip
            content="Поле обязательно для заполнения"
            *ngIf="field.hasError('required')"></icon-error-tooltip>        
        <icon-error-tooltip
            content="Величина должна быть не меньше {{cell.getColumn().getConfig()?.min}}"
            *ngIf="field.hasError('min')"></icon-error-tooltip>        
        <icon-error-tooltip
            content="Величина должна быть не больше {{cell.getColumn().getConfig()?.max}}"
            *ngIf="field.hasError('max')"></icon-error-tooltip>
      </div>
    </div>
    `,
})
export class NumberEditorComponent extends DefaultEditor {

  constructor() {
    super();
  }
}

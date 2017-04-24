import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'checkbox',
  styleUrls: ['./checkbox.scss'],
  templateUrl: './checkbox.html'
})

export class CheckBox implements OnInit{
  @Input() form: FormGroup;
  @Input() field: any = {};

  constructor() {}

  ngOnInit() {
    let value = {};
    value[this.field.key] = this.field.checked;
    this.form.patchValue(value);
  }
}

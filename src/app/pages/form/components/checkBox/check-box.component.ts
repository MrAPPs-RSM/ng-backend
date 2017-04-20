import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'check-box',
  styleUrls: ['./check-box.scss'],
  templateUrl: './check-box.html'
})

export class CheckBox {
  @Input() form: FormGroup;
  @Input() field: any = {};
}

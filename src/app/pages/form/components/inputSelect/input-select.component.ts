import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectComponent } from 'ng2-select';

@Component({
  selector: 'input-select',
  styleUrls: ['./input-select.scss'],
  templateUrl: './input-select.html'
})
export class InputSelect {
  @Input() form: FormGroup;
  @Input() field: any = {};
  @ViewChild('ngSelect') public ngSelect: SelectComponent;

  items: string[] = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
      'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
      'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
      'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
      'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
      'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
      'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
      'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
      'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
      'Zagreb', 'Zaragoza', 'Łódź'];

  value: any = {};

  get showClearButton() {
      if (this.field.multiple) {
          return this.value.length > 1;
      } else {
          return this.value.hasOwnProperty('id') && this.value.hasOwnProperty('text');
      }
  }

  get isValid() {
      if (this.field.validators.required) {
          if (this.field.multiple) {
              return this.value.length > 0;
          } else {
              return this.value.hasOwnProperty('id') && this.value.hasOwnProperty('text');
          }
      } else {
          return true;
      }
  }

  public clearValue(): void {
      this.ngSelect.active = [];
      this.form.controls[this.field.key].reset();
      this.refreshValue({});
  }

  public refreshValue(value: any): void {
      this.value = value;
  }

  public selected(value: any): void {
      console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
      console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
      console.log('New search input: ', value);
  }
}

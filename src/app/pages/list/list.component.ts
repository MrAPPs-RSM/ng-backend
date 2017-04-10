import { Component } from '@angular/core';

import { ListService } from './list.service';
import { LocalDataSource } from 'ng2-smart-table';

import 'style-loader!./list.scss';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'smart-tables',
  templateUrl: './list.html',
})
export class List {

  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {}
  };

  data: LocalDataSource = new LocalDataSource();

  params: {}; // Params from server

  constructor(protected route: ActivatedRoute, protected service: ListService) {

    this.params = route.snapshot.data;

    // Set table structure
    this.settings.columns = this.params.columns;

    this.service.setApiKey(this.params.name);

    this.service.getData()
        .subscribe(
            data => {
              this.data.load(data);
            },
            error => {
              console.log(error); // TODO
            }
        );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}

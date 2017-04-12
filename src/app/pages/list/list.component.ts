import { Component } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import 'style-loader!./list.scss';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api';

@Component({
  selector: 'smart-tables',
  templateUrl: './list.html',
})
export class List {

  settings = {
    mode: 'external',
    noDataMessage: 'Loading...',
    actions: {
      position: 'right'
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>'
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>'
    },
    columns: {}
  };

  source: LocalDataSource = new LocalDataSource();

  params: any = {}; // Setup params

  constructor(protected _router: Router, protected _route: ActivatedRoute, protected _apiService: ApiService) {

    this.params = this._route.snapshot.data;

    // Set table structure
    this.settings.columns = this.params.table.columns;

    this._apiService.get(this.params.api.name)
        .subscribe(
            data => {
              this.source.load(data);
            },
            error => {
              console.log(error); // TODO
            }
        );
  }

  onCreate(): void {
    this._router.navigate(['pages/users/create']);
  }

  onEdit(event): void {
    this._router.navigate(['pages/users/edit/' + event.data.id]);
  }

  onDelete(event): void {

    // TODO: add a cool dialog
    if (window.confirm('Are you sure you want to delete?')) {

      this._apiService.delete(this.params.api.name + '/' + event.data.id)
          .subscribe(
              res => {
                event.confirm.resolve();
              },
              error => {
                console.log(error); // TODO
                event.confirm.resolve();
              }
          );
    }
  }
}

import { Component, OnInit } from '@angular/core';

import 'style-loader!./list.scss';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, ServerDataSource } from '../../api';

@Component({
    selector: 'list',
    templateUrl: './list.html',
})
export class List implements OnInit {

    settings = {
        mode: 'external',
        noDataMessage: 'No data found',
        add: {
            addButtonContent: '<i class="ion-ios-plus-outline green"></i>'
        },
        edit: {
            editButtonContent: '<i class="ion-edit yellow"></i>'
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-a red"></i>'
        },
        actions: {},
        columns: {},
        pager: {
            perPage: 10
        }
    };

    source: ServerDataSource;

    params: any = {}; // Setup params

    constructor(protected _router: Router, protected _route: ActivatedRoute, protected _apiService: ApiService) {}

    ngOnInit() {
        this.params = this._route.snapshot.data;
        this.settings.actions = this.params.table.actions;
        this.settings.columns = this.params.table.columns;
        this.loadData();
    }

    loadData(): void {
        this.source = new ServerDataSource(
            this._apiService.getHttp(),
            this._apiService.getComposedUrl(this.params.api.name)
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

            this._apiService.delete(this.params.api.name, true, '/' + event.data.id)
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

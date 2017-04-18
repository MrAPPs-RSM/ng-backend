import { Component, OnInit } from '@angular/core';

import 'style-loader!./list.scss';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, ServerDataSource } from '../../api';

@Component({
    selector: 'smart-tables',
    templateUrl: './list.html',
})
export class List implements OnInit {

    settings = {
        mode: 'external',
        noDataMessage: 'No data found',
        actions: {
            position: 'right'
        },
        add: {
            addButtonContent: '<i class="ion-ios-plus-outline green"></i>'
        },
        edit: {
            editButtonContent: '<i class="ion-edit yellow"></i>'
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-a red"></i>'
        },
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
        this.settings.columns = this.params.columns;
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

            this._apiService.delete(this.params.api.name + '/' + event.data.id, true)
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

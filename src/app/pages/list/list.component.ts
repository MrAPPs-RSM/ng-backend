import { Component, OnInit } from '@angular/core';

import 'style-loader!./list.scss';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, ServerDataSource } from '../../api';
import { ToastHandler } from '../../theme/services';

@Component({
    selector: 'list',
    templateUrl: './list.html',
})
export class List implements OnInit {

    settings = {
        mode: 'external',
        noDataMessage: 'No data found',
        add: {
            addButtonContent: '<span class="btn btn-xs btn-success"><i class="fa fa-plus-circle"></i></span>'
        },
        edit: {
            editButtonContent: '<span class="btn btn-xs btn-warning"><i class="fa fa-edit"></i></span>'
        },
        delete: {
            deleteButtonContent: '<span class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></span>'
        },
        actions: {},
        columns: {},
        pager: {
            perPage: 10
        }
    };

    source: ServerDataSource;

    params: any = {}; // Setup params

    constructor(protected _router: Router,
                protected _route: ActivatedRoute,
                protected _apiService: ApiService,
                protected _toastManager: ToastHandler
    ) {}

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
        this._router.navigate(['pages/' + this.params.api.name + '/' + this.params.api.add]);
    }

    onEdit(event: any): void {
        this._router.navigate(['pages/' + this.params.api.name + '/' + this.params.api.edit + '/' + event.data.id]);
    }

    onDelete(event: any): void {

        // TODO: add a real dialog
        if (window.confirm('Are you sure you want to delete?')) {

            this._apiService.delete(this.params.api.name, true, '/' + event.data.id)
                .subscribe(
                    res => {
                        this._toastManager.info('Item deleted successfully');
                        event.confirm.resolve();
                    },
                    error => {
                        this._toastManager.error("Can't delete item, try again later");
                        event.confirm.resolve();
                    }
                );
        }
    }
}

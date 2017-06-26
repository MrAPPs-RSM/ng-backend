import { Injectable } from '@angular/core';

@Injectable()
export class ListPaging {

    private pagingConf = {
        perPage: 10,
        page: 1
    };

    constructor() {
    }

    public setPaging(conf: { perPage: number, page: number }): void {
        this.pagingConf = conf;
    }

    public getPaging(): any {
        return this.pagingConf;
    }
}

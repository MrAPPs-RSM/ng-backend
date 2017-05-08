import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValuesService {

    private values: any = {};

    constructor() {}

    setValue(key: string, value: any): void {
        console.log('[GLOBAL SERVICE]: Setting ' + key + ' with value:');
        console.log(value);
        this.values[key] = value;
    }

    removeValue(key: string): void {
        console.log('[GLOBAL SERVICE]: Deleting ' + key + ' with value:');
        console.log(this.values[key]);
        delete this.values[key];
    }

    getValue(key: string): any {
        console.log('[GLOBAL SERVICE]: Getting ' + key + ' with value:');
        console.log(this.values[key]);
        return this.values[key];
    }
}

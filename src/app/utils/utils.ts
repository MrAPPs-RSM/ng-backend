import * as _ from 'lodash';

export class Utils {

    static containsObject(obj: any, list: any[]): boolean {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
    }

    static isEmptyObject(obj: any): boolean {
        return Object.keys(obj).length === 0;
    }

    static removeObjectFromArray(obj: any, list: any[]): any[] {
        let index = -1;
        list.forEach((item, i) => {
            if (_.isEqual(obj, item)) {
                index = i;
            }
        });
        if (index !== -1) {
            list.splice(index, 1);
        }
        return list;
    }

    static containsValue(obj: any, value: any): boolean {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === value) {
                return true;
            }
        });
        return false;
    }
}

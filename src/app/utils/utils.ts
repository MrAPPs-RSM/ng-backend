export class Utils {

    static containsObject(obj, list): boolean {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
    }

    static isEmptyObject(obj): boolean {
        return Object.keys(obj).length === 0;
    }

    static removeObjectFromArray(obj, list): any[] {
        let i = list.indexOf(obj);
        if (i !== -1) {
            list.splice(i, 1);
        }
        return list;
    }
}

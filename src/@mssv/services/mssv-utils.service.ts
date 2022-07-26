import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MssvUtilsService {

    constructor() {
    }

    createCleanBasePathFromStringArray(sArray: string[]): string {

        const tArray = [];
        sArray.forEach(this.removeSpecialCharacters);
        const rVal = tArray.join('/') + '/';
        return (rVal === '/') ? null : rVal;
    }

    removeSpecialCharacters(str: string): string {
        if (!str) {
            return null;
        }
        return str.replace(/[^0-9a-zA-Z -]+/gi, '').substring(0, 40).trim();
    }

    getExtensionFromFile(str: string): string {
        if (!str) {
            return null;
        }
        const index = str.lastIndexOf( '.' );
        return str.substr(index);
    }

    convertObjectPropsToCamelCase(inObj): any {
        const object = inObj || {};
        for (const prop in object) {
            if (object.hasOwnProperty(prop)) {
                const newProp = prop.substring(0, 1).toLowerCase() + prop.substring(1);
                object[newProp] = object[prop];
                if (newProp !== prop) {
                    delete object[prop];
                }
            }
        }

        return object;
    }
}

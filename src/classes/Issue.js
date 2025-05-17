import { TYPES } from '../constants/constants';

export class Error {
    constructor(type, itemIndex, details = null) {
        this.type = type;
        this.itemIndex = itemIndex;
        this.details = details;
    }

    static types = TYPES;
}

import { TYPES } from '../shared/constants/constants';

export class Issue {
    constructor(type, itemIndex, isError = true, details = null) {
        this.type = type;
        this.itemIndex = itemIndex;
        this.isError = isError; // true for error, false for warning
        this.details = details;
    }

    static types = TYPES;
}

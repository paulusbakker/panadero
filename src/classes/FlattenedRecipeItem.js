import { Issue } from './Issue';

export class FlattenedRecipeItem {
    constructor(
        index,
        id,
        isRecipe,
        name,
        depth,
        isFlour,
        isLiquid,
        percentage,
        pricePerKilo,
        parentIndex,
    ) {
        this.index = index;
        this.id = id;
        this.isRecipe = isRecipe;
        this.name = name;
        this.depth = depth;
        this.isFlour = isFlour;
        this.isLiquid = isLiquid;
        this.percentage = percentage;
        this.weight = 0;
        this.stepPercentage = percentage;
        this.stepWeight = 0;
        this.pricePerKilo = pricePerKilo;
        this.isFaulty = false;
        this.isFaultyRecipe = false;
        this.isFaultyIngredient = false;
        this.parentIndex = parentIndex;
        this.issues = [];
    }

    addIssue(type, isError = true, index = null, details = null) {
        const issue = new Issue(type, index, isError, details);
        this.issues.push(issue);
        if (isError) {
            this.isFaulty = true;
            if (this.isRecipe) {
                this.isFaultyRecipe = true;
            } else {
                this.isFaultyIngredient = true;
            }
        }
    }

    getLastIssue() {
        return this.issues.length ? this.issues[this.issues.length - 1] : null;
    }
}

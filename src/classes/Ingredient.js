export class Ingredient {
  constructor(name, category, caloriesPerGram, pricePerKilo) {
    this.isArchived = false;
    this.name = name;
    this.category = category;
    this.caloriesPerGram = caloriesPerGram;
    this.pricePerKilo = pricePerKilo;
  }

  static createNew() {
    return new Ingredient('', 0, 0, 0);
  }
}

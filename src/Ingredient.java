public class Ingredient {

     boolean isArchived;
     String name;
     int categorie;
     double caloriesPerGram;
     double pricePerKilo;

    public Ingredient(boolean isArchived, String name, int categorie, double caloriesPerGram, double pricePerKilo) {
        this.isArchived = isArchived;
        this.name = name;
        this.categorie = categorie;
        this.caloriesPerGram = caloriesPerGram;
        this.pricePerKilo = pricePerKilo;
    }
}

import java.util.List;

public class Recipe {

    String name;
    int categorie;
    List<RecipeIngredient> recipeIngredients;

    public Recipe(String name, int categorie, List<RecipeIngredient> recipeIngredients) {
        this.name = name;
        this.categorie = categorie;
        this.recipeIngredients = recipeIngredients;
    }
}

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

public class RecipeBook {
    String name;
    Map<Integer, String> recipeCategories;
    Map<Integer, String> ingredientCategories;
    Map<Integer, Ingredient> ingredientMap;
    Map<Integer, Recipe> recipes;

    private static final DecimalFormat df = new DecimalFormat("0.00");
    int tab;

    public RecipeBook(String name, Map<Integer, String> recipeCategories, Map<Integer, String> ingredientCategories, Map<Integer, Ingredient> ingredientMap, Map<Integer, Recipe> recipes) {
        this.name = name;
        this.recipeCategories = recipeCategories;
        this.ingredientCategories = ingredientCategories;
        this.ingredientMap = ingredientMap;
        this.recipes = recipes;
    }

    public void addRecipe(Recipe recipe) {

    }

    public void modifyRecipe(Recipe recipe) {

    }

    public void deleteRecipe(Recipe recipe) {

    }

    public void addIngredient(Ingredient ingredient) {

    }

    public void modifyIngredient(Ingredient ingredient) {

    }

    public void deleteIngredient(Ingredient ingredient) {

    }


    public Map<Integer, Ingredient> searchIngredient(String name) {
        return new HashMap<>();
    }

    public void printRecipes() {


        for (Recipe recipe : recipes.values()) {
            tab = 0;
            printRecipe(recipe, 0);
            System.out.println("=====================================");
        }
    }


    public void printRecipe(Recipe recipe, double percent) {
        tabulator();
        System.out.println(recipe.name + "\t" + (percent > 0 ? "\t\t" + df.format(percent * 100) + "%" : ""));
        tabulator();
        System.out.println("----------------------------------");
        for (RecipeIngredient recipeIngredient : recipe.recipeIngredients) {
            if (!recipeIngredient.isRecipe) {
                tabulator();
                System.out.println(ingredientMap.get(recipeIngredient.id).name + "\t\t" + df.format(recipeIngredient.percent * 100) + "%");
            } else {
                tab++;
                printRecipe(recipes.get(recipeIngredient.id), recipeIngredient.percent);
            }
        }
    }

    public void tabulator() {
        for (int x = 0; x < tab; x++) System.out.print("\t");
    }
}

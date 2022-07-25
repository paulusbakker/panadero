import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Main {


    public static void main(String[] args) {

//      laad de recepten en ingrediënten

        Map<Integer, String> recipeCategories = new HashMap<>();
        Map<Integer, String> ingredientCategories = new HashMap<>();
        Map<Integer, Ingredient> ingredientMap = new HashMap<>();
        Map<Integer, Recipe> recipes = new HashMap<>();

        recipeCategories.put(1, "Yeast Breads");
        recipeCategories.put(2, "Sourdough Breads");
        recipeCategories.put(3, "Poolish & Starters");
        recipeCategories.put(4, "Quick Breads");
        recipeCategories.put(5, "Rolls, Bagles & Flatbread");
        recipeCategories.put(6, "Pizza");
        recipeCategories.put(7, "Muffins");
        recipeCategories.put(8, "Scones");
        recipeCategories.put(9, "Pastry");
        recipeCategories.put(10, "Cakes");
        recipeCategories.put(11, "Cookies");
        recipeCategories.put(12, "Pies & Tarts");
        recipeCategories.put(13, "Puddings & Custards");
        recipeCategories.put(14, "Other");

        ingredientCategories.put(1, "Flours, Starches & Meals");
        ingredientCategories.put(2, "Yeasts");
        ingredientCategories.put(3, "Egg & Dairy");
        ingredientCategories.put(4, "Water & Other Liquids");
        ingredientCategories.put(5, "Leaveners & Thickeners");
        ingredientCategories.put(6, "Salts");
        ingredientCategories.put(7, "Sugar & Sweeteners");
        ingredientCategories.put(8, "Fats & Oils");
        ingredientCategories.put(9, "Vinegars");
        ingredientCategories.put(10, "Baking Enhancers");
        ingredientCategories.put(11, "Whole Grains & Seeds");
        ingredientCategories.put(12, "Flavoring Agents");
        ingredientCategories.put(13, "Fruits");
        ingredientCategories.put(14, "Nuts");
        ingredientCategories.put(15, "Spices");
        ingredientCategories.put(16, "Cocoa & Chocolates");
        ingredientCategories.put(17, "Other");

        ingredientMap.put(8, new Ingredient(false, "Butter (Unsalted)", 8, 0, 0));
        ingredientMap.put(9, new Ingredient(false, "Butter (Salted)", 8, 0, 0));
        ingredientMap.put(13, new Ingredient(false, "Olive Oil (Extra-Virgin)", 8, 0, 0));
        ingredientMap.put(15, new Ingredient(false, "Vegetable Oil", 8, 0, 0));
        ingredientMap.put(30, new Ingredient(false, "Sesame Seed", 11, 0, 0));
        ingredientMap.put(45, new Ingredient(false, "Lemon Juice", 12, 0, 0));
        ingredientMap.put(54, new Ingredient(false, "Vanilla Extract", 12, 0, 0));
        ingredientMap.put(62, new Ingredient(false, "Lemon (Zest)", 13, 0, 0));
        ingredientMap.put(66, new Ingredient(false, "Raisins", 13, 0, 0));
        ingredientMap.put(67, new Ingredient(false, "Almonds", 14, 0, 0));
        ingredientMap.put(71, new Ingredient(false, "Walnuts", 14, 0, 0));
        ingredientMap.put(72, new Ingredient(false, "Caraway Seed", 15, 0, 0));
        ingredientMap.put(73, new Ingredient(false, "Cinnamon (Ground)", 15, 0, 0));
        ingredientMap.put(86, new Ingredient(false, "White Granulated Sugar (Fine)", 7, 0, 0));
        ingredientMap.put(87, new Ingredient(false, "Brown Sugar (Light", 7, 0, 0));
        ingredientMap.put(93, new Ingredient(false, "Honey", 7, 0, 0));
        ingredientMap.put(99, new Ingredient(false, "Iodized Salt", 6, 0, 0));
        ingredientMap.put(100, new Ingredient(false, "Kosher Salt", 6, 0, 0));
        ingredientMap.put(102, new Ingredient(false, "Sea Salt", 6, 0, 0));
        ingredientMap.put(104, new Ingredient(false, "Baking Powder", 5, 0, 0));
        ingredientMap.put(105, new Ingredient(false, "Baking Soda", 5, 0, 0));
        ingredientMap.put(108, new Ingredient(false, "Xanthan Gum", 5, 0, 0));
        ingredientMap.put(109, new Ingredient(false, "Water", 4, 0, 0));
        ingredientMap.put(154, new Ingredient(false, "All-Purpose Flour", 1, 0, 0));
        ingredientMap.put(155, new Ingredient(false, "Bread Flour", 1, 0, 0));
        ingredientMap.put(156, new Ingredient(false, "Whole Wheat Flour", 1, 0, 0));
        ingredientMap.put(150, new Ingredient(false, "Yeast (Instant)", 2, 0, 0));
        ingredientMap.put(141, new Ingredient(false, "Milk (Whole)", 3, 0, 0));
        ingredientMap.put(134, new Ingredient(false, "Egg Whites", 3, 0, 0));
        ingredientMap.put(132, new Ingredient(false, "Eggs", 3, 0, 0));
        ingredientMap.put(158, new Ingredient(false, "Buckwheat Flour", 1, 0, 0));
        ingredientMap.put(161, new Ingredient(false, "Durum Flour", 1, 0, 0));
        ingredientMap.put(179, new Ingredient(false, "Teff Flour", 1, 0, 0));
        ingredientMap.put(174, new Ingredient(false, "Rye Flour (Medium)", 1, 0, 0));

//      laad de recepten

        ArrayList<RecipeIngredient> recipeIngredients = new ArrayList<>();
        RecipeIngredient recipeIngredient = new RecipeIngredient(true, false, 154, 1, false);
        recipeIngredients.add(recipeIngredient);
        recipeIngredient = new RecipeIngredient(false, true, 109, 0.88, false);
        recipeIngredients.add(recipeIngredient);
        recipes.put(3, new Recipe("Starter", 3, recipeIngredients));

        recipeIngredients = new ArrayList<>();
        recipeIngredient = new RecipeIngredient(true, false, 154, 0.8, false);
        recipeIngredients.add(recipeIngredient);
        recipeIngredient = new RecipeIngredient(false, true, 109, 1, false);
        recipeIngredients.add(recipeIngredient);
        recipeIngredient = new RecipeIngredient(false, false, 150, 0.001, false);
        recipeIngredients.add(recipeIngredient);
        recipes.put(1, new Recipe("100% Poolish", 3, recipeIngredients));

        recipeIngredients = new ArrayList<>();
        recipeIngredient = new RecipeIngredient(true, false, 154, 1, false);
        recipeIngredients.add(recipeIngredient);
        recipeIngredient = new RecipeIngredient(false, true, 109, 0.48, false);
        recipeIngredients.add(recipeIngredient);
        recipeIngredient = new RecipeIngredient(false, false, 100, 0.035, false);
        recipeIngredients.add(recipeIngredient);
        recipeIngredient = new RecipeIngredient(false, false, 1, 0.96, true);
        recipeIngredients.add(recipeIngredient);
        recipes.put(2, new Recipe("Rustic Boule", 1, recipeIngredients));

        RecipeBook paul = new RecipeBook("Paul's receptenboek", recipeCategories, ingredientCategories, ingredientMap, recipes);

        paul.printRecipes();


    }


}

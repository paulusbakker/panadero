import { Ingredient } from "../classes/Ingredient";
import { Recipe } from "../classes/Recipe";
import { RecipeBook } from "../classes/RecipeBook";
import { RecipeIngredient } from "../classes/RecipeIngredient";
import { IncludedRecipe } from "../classes/IncludedRecipe";

export function makeRecipeBook() {
  let recipeCategories = new Map();
  let ingredientCategories = new Map();
  let ingredients = new Map();
  let recipes = new Map();

  recipeCategories.set("1", "Yeast Breads");
  recipeCategories.set("2", "Sourdough Breads");
  recipeCategories.set("3", "Poolish & Starters & Sponges & Soakers");
  recipeCategories.set("4", "Quick Breads");
  recipeCategories.set("5", "Rolls, Bagles & Flatbread");
  recipeCategories.set("6", "Pizza");
  recipeCategories.set("7", "Muffins");
  recipeCategories.set("8", "Scones");
  recipeCategories.set("9", "Pastry");
  recipeCategories.set("10", "Cakes");
  recipeCategories.set("11", "Cookies");
  recipeCategories.set("12", "Pies & Tarts");
  recipeCategories.set("13", "Puddings & Custards");
  recipeCategories.set("14", "Other");

  ingredientCategories.set("1", "Flours, Starches & Meals");
  ingredientCategories.set("2", "Yeasts");
  ingredientCategories.set("3", "Egg & Dairy");
  ingredientCategories.set("4", "Water & Other Liquids");
  ingredientCategories.set("5", "Leaveners & Thickeners");
  ingredientCategories.set("6", "Salts");
  ingredientCategories.set("7", "Sugar & Sweeteners");
  ingredientCategories.set("8", "Fats & Oils");
  ingredientCategories.set("9", "Vinegars");
  ingredientCategories.set("10", "Baking Enhancers");
  ingredientCategories.set("11", "Whole Grains & Rice & Seeds etc");
  ingredientCategories.set("12", "Flavoring Agents");
  ingredientCategories.set("13", "Fruits");
  ingredientCategories.set("14", "Nuts");
  ingredientCategories.set("15", "Spices");
  ingredientCategories.set("16", "Cocoa & Chocolates");
  ingredientCategories.set("17", "Other");

  ingredients.set("1", new Ingredient("Balsamic Vinegar", "9", 0, 0));
  ingredients.set("2", new Ingredient("Cider Vinegar", "9", 0, 0));
  ingredients.set("3", new Ingredient("Sherry Vinegar", "9", 0, 0));
  ingredients.set("4", new Ingredient("White Vinegar", "9", 0, 0));
  ingredients.set("5", new Ingredient("White Wine Vinegar", "9", 0, 0));
  ingredients.set("6", new Ingredient("Red Wine Vinegar", "9", 0, 0));
  ingredients.set("7", new Ingredient("Rice Wine Vinegar", "9", 0, 0));

  ingredients.set("8", new Ingredient("Butter (Unsalted)", "8", 7.17, 0));
  ingredients.set("9", new Ingredient("Butter (Salted)", "8", 7.17, 0));
  ingredients.set("10", new Ingredient("Clarified Butter", "8", 8.76, 0));
  ingredients.set("11", new Ingredient("Lard", "8", 9.02, 0));
  ingredients.set("12", new Ingredient("Margarine", "8", 7, 0));
  ingredients.set(
    "13",
    new Ingredient("Olive Oil (Extra-Virgin)", "8", 8.84, 0)
  );
  ingredients.set("14", new Ingredient("Shortening", "8", 8.84, 0));
  ingredients.set("15", new Ingredient("Vegetable Oil", "8", 8.84, 0));
  ingredients.set("16", new Ingredient("Ascorbic Acid", "10", 0, 0));
  ingredients.set("17", new Ingredient("Caramel Color", "10", 0, 0));
  ingredients.set("18", new Ingredient("Coconut Milk Powder", "10", 0, 0));
  ingredients.set("19", new Ingredient("Granular Lecithin", "10", 0.4, 0));

  ingredients.set("20", new Ingredient("Barley Flakes", "11", 3.5, 0));
  ingredients.set("21", new Ingredient("Chia Seed", "11", 4.86, 0));
  ingredients.set("22", new Ingredient("Cracked Wheat", "11", 3.5, 0));
  ingredients.set("23", new Ingredient("Flax Seed", "11", 5.34, 0));
  ingredients.set("24", new Ingredient("Malted Wheat Flake", "11", 3.5, 0));
  ingredients.set("25", new Ingredient("Oats (Rolled)", "11", 3.74, 0));
  ingredients.set("26", new Ingredient("Oats (Steel-Cut)", "11", 3.8, 0));
  ingredients.set("27", new Ingredient("Poppy Seed", "11", 5.25, 0));
  ingredients.set("28", new Ingredient("Pumpkin Seed", "11", 4.46, 0));
  ingredients.set("29", new Ingredient("Rye Chops", "11", 3.33, 0));
  ingredients.set("30", new Ingredient("Sesame Seed", "11", 6.27, 0));
  ingredients.set("31", new Ingredient("Sesame Seed (Toasted)", "11", 5.73, 0));
  ingredients.set("32", new Ingredient("Wheat Berries", "11", 3.25, 0));

  ingredients.set("33", new Ingredient("Almond Extract", "12", 0, 0));
  ingredients.set("34", new Ingredient("Anise Oil", "12", 0, 0));
  ingredients.set("35", new Ingredient("Barley Malt Syrup", "12", 0, 0));
  ingredients.set("36", new Ingredient("Banana Flavoring", "12", 0, 0));
  ingredients.set("37", new Ingredient("Butter-Rum Flavoring", "12", 0, 0));
  ingredients.set("38", new Ingredient("Butterscotch Flavoring", "12", 0, 0));
  ingredients.set("39", new Ingredient("Cheese Powder", "12", 0, 0));
  ingredients.set("40", new Ingredient("Cinnamon Oil", "12", 0, 0));
  ingredients.set("41", new Ingredient("Citric Acid", "12", 0, 0));
  ingredients.set("42", new Ingredient("Coconut Flavoring", "12", 0, 0));
  ingredients.set("43", new Ingredient("Espresso Powder", "12", 0, 0));
  ingredients.set("44", new Ingredient("Lemon Extract", "12", 0, 0));
  ingredients.set("45", new Ingredient("Lemon Juice", "12", 0.25, 0));
  ingredients.set("46", new Ingredient("Lemon Oil", "12", 0, 0));
  ingredients.set("47", new Ingredient("Lime Juice", "12", 0.25, 0));
  ingredients.set("48", new Ingredient("Lime Oil", "12", 0, 0));
  ingredients.set("49", new Ingredient("Orange Juice", "12", 0.45, 0));
  ingredients.set("50", new Ingredient("Orange Oil", "12", 0, 0));
  ingredients.set("51", new Ingredient("Peppermint Oil", "12", 0, 0));
  ingredients.set("52", new Ingredient("Pineapple Juice", "12", 0.41, 0));
  ingredients.set("53", new Ingredient("Rose Water", "12", 0, 0));

  ingredients.set("54", new Ingredient("Vanilla Extract", "12", 0, 0));
  ingredients.set("55", new Ingredient("Apples (Baked)", "13", 0.5, 0));
  ingredients.set("56", new Ingredient("Apricots (Dried)", "13", 2.41, 0));
  ingredients.set("57", new Ingredient("Blueberries (Dried)", "13", 3.25, 0));
  ingredients.set(
    "58",
    new Ingredient("Cranberries (Dried, Unsweetened)", "13", 0, 0)
  );
  ingredients.set(
    "59",
    new Ingredient("Cranberries (Dried, Sweetened)", "13", 3.08, 0)
  );
  ingredients.set("60", new Ingredient("Cherries (Dried)", "13", 3.1, 0));
  ingredients.set("61", new Ingredient("Ginger (Crystallized)", "13", 3.5, 0));
  ingredients.set("62", new Ingredient("Lemon (Zest)", "13", 0, 0));
  ingredients.set("63", new Ingredient("Lime (Zest)", "13", 0, 0));
  ingredients.set("64", new Ingredient("Orange (Zest", "13", 0, 0));
  ingredients.set("65", new Ingredient("Pineapple (Dried)", "13", 2.45, 0));
  ingredients.set("66", new Ingredient("Raisins", "13", 3, 0));
  ingredients.set("67", new Ingredient("Almonds", "14", 5.76, 0));
  ingredients.set(
    "68",
    new Ingredient("Coconut (Shredded, Unsweetened)", "14", 6.6, 0)
  );
  ingredients.set("69", new Ingredient("Pecan", "14", 7.33, 0));
  ingredients.set("70", new Ingredient("Pistachio", "14", 5.62, 0));
  ingredients.set("71", new Ingredient("Walnuts", "14", 6.54, 0));
  ingredients.set("72", new Ingredient("Caraway Seed", "15", 3.33, 0));
  ingredients.set("73", new Ingredient("Cinnamon (Ground)", "15", 2.6, 0));
  ingredients.set("74", new Ingredient("Cinnamon (Stick)", "15", 2.6, 0));

  ingredients.set("75", new Ingredient("Bitter-Sweet (Bar)", "16", 0, 0));
  ingredients.set("76", new Ingredient("Bitter-Sweet (Chips)", "16", 0, 0));
  ingredients.set("77", new Ingredient("Caramel", "16", 0, 0));
  ingredients.set("78", new Ingredient("Dark Chocolate (Bar)", "16", 0, 0));
  ingredients.set("79", new Ingredient("Dark Chocolate (Chips)", "16", 0, 0));
  ingredients.set("80", new Ingredient("Milk Chocolate (Bar)", "16", 0, 0));
  ingredients.set("81", new Ingredient("Milk Chocolate (Chips)", "16", 0, 0));
  ingredients.set("82", new Ingredient("Semi-Sweet (Bar)", "16", 0, 0));
  ingredients.set("83", new Ingredient("Semi-Sweet (Chips)", "16", 0, 0));
  ingredients.set("84", new Ingredient("White Chocolate (Bar)", "16", 0, 0));
  ingredients.set("85", new Ingredient("White Chocolate (Chips)", "16", 0, 0));
  ingredients.set(
    "86",
    new Ingredient("White Granulated Sugar (Fine)", "7", 3.89, 0)
  );
  ingredients.set("87", new Ingredient("Brown Sugar (Light", "7", 3.97, 0));
  ingredients.set("88", new Ingredient("Brown Sugar (Dark)", "7", 3.69, 0));
  ingredients.set(
    "89",
    new Ingredient("Powdered Sugar (Confectioners)", "7", 3.89, 0)
  );
  ingredients.set("90", new Ingredient("Agave Nectar", "7", 3.1, 0));
  ingredients.set("91", new Ingredient("Coarse Suga", "7", 3.89, 0));
  ingredients.set("92", new Ingredient("Demerara Sugar", "7", 3.8, 0));
  ingredients.set("93", new Ingredient("Honey", "7", 3.04, 0));
  ingredients.set("94", new Ingredient("Maple Syrup", "7", 2.6, 0));
  ingredients.set("95", new Ingredient("Muscovado Sugar", "7", 3.95, 0));
  ingredients.set("96", new Ingredient("Sanding Sugar", "7", 3.75, 0));
  ingredients.set("97", new Ingredient("Simple Syrup", "7", 2.6, 0));
  ingredients.set("98", new Ingredient("Turbinado Sugar", "7", 3.99, 0));
  ingredients.set("99", new Ingredient("Iodized Salt", "6", 0, 0));
  ingredients.set("100", new Ingredient("Kosher Salt", "6", 0, 0));
  ingredients.set("101", new Ingredient("Pickling Salt", "6", 0, 0));
  ingredients.set("102", new Ingredient("Sea Salt", "6", 0, 0));
  ingredients.set(
    "103",
    new Ingredient("Baking Ammonia (Ammonium Carbonate)", "5", 0, 0)
  );
  ingredients.set("104", new Ingredient("Baking Powder", "5", 0, 0));
  ingredients.set("105", new Ingredient("Baking Soda", "5", 0, 0));
  ingredients.set("106", new Ingredient("Clearjel", "5", 0, 0));
  ingredients.set("107", new Ingredient("Cream of Tartar", "5", 2.58, 0));
  ingredients.set("108", new Ingredient("Xanthan Gum", "5", 0, 0));

  ingredients.set("109", new Ingredient("Water", "4", 0, 0));
  ingredients.set("110", new Ingredient("Beer (Lager)", "4", 0, 0));
  ingredients.set("111", new Ingredient("Beer (Ale)", "4", 0, 0));
  ingredients.set("112", new Ingredient("Beer (Porter)", "4", 0, 0));
  ingredients.set("113", new Ingredient("Beer (Stout)", "4", 0, 0));
  ingredients.set("114", new Ingredient("Beer (Weizen)", "4", 0, 0));
  ingredients.set("115", new Ingredient("Brandy", "4", 2.34, 0));
  ingredients.set("116", new Ingredient("Rum (Light)", "4", 0, 0));
  ingredients.set("117", new Ingredient("Rum (Dark)", "4", 0, 0));
  ingredients.set("118", new Ingredient("Rum (Spiced)", "4", 0, 0));
  ingredients.set("119", new Ingredient("Tequila (80 proof)", "4", 2.31, 0));
  ingredients.set("120", new Ingredient("Vodka (80 proof)", "4", 0, 0));
  ingredients.set("121", new Ingredient("Wine (White, Dry)", "4", 0, 0));
  ingredients.set("122", new Ingredient("Wine (White, Sweet)", "4", 0, 0));
  ingredients.set("123", new Ingredient("Wine (Red, Dry)", "4", 0, 0));
  ingredients.set("124", new Ingredient("Wine (Red, Sweet)", "4", 0, 0));
  ingredients.set("125", new Ingredient("Buttermilk", "3", 0.6, 0));
  ingredients.set("126", new Ingredient("Buttermilk (Powder)", "3", 3.87, 0));
  ingredients.set("127", new Ingredient("Condensed Milk", "3", 3.21, 0));
  ingredients.set(
    "128",
    new Ingredient("Cream (Half & Half, 10-18%)", "3", 1.3, 0)
  );
  ingredients.set("129", new Ingredient("Cream (Light, 18-30%)", "3", 1.95, 0));
  ingredients.set(
    "130",
    new Ingredient("Cream (Light Whipping, 30-36%)", "3", 3.35, 0)
  );
  ingredients.set("131", new Ingredient("Cream (Heavy, >36%)", "3", 3.45, 0));
  ingredients.set("132", new Ingredient("Egg Whites", "3", 3.82, 0));
  ingredients.set("133", new Ingredient("Egg Whites (Powder)", "3", 3.82, 0));
  ingredients.set("134", new Ingredient("Eggs (50g=1)", "3", 1.47, 0));
  ingredients.set("135", new Ingredient("Eggs (Powder)", "3", 5.94, 0));
  ingredients.set("136", new Ingredient("Evaporated Milk", "3", 1.34, 0));
  ingredients.set("137", new Ingredient("Goat Milk", "3", 0.69, 0));
  ingredients.set("138", new Ingredient("Greek Yogurt", "3", 1.15, 0));
  ingredients.set("139", new Ingredient("Greek Yogurt (Non-Fat)", "3", 0.6, 0));
  ingredients.set("140", new Ingredient("Meringue Powder", "3", 3.33, 0));
  ingredients.set("141", new Ingredient("Milk (Whole)", "3", 0.5, 0));
  ingredients.set("142", new Ingredient("Milk (2%)", "3", 0.5, 0));
  ingredients.set("143", new Ingredient("Milk (1%)", "3", 0.42, 0));
  ingredients.set("144", new Ingredient("Milk (Skim)", "3", 0.34, 0));
  ingredients.set("145", new Ingredient("Milk (Powder)", "3", 4.96, 0));
  ingredients.set("146", new Ingredient("Sheep Milk", "3", 1.02, 0));
  ingredients.set("147", new Ingredient("Sour Cream", "3", 1.93, 0));
  ingredients.set("148", new Ingredient("Yogurt", "3", 0.61, 0));
  ingredients.set("149", new Ingredient("Yogurt (Non-Fat)", "3", 0.48, 0));
  ingredients.set("150", new Ingredient("Yeast (Instant)", "3", 3.25, 0));
  ingredients.set("151", new Ingredient("Yeast (Active Dry)", "2", 3.25, 0));
  ingredients.set("152", new Ingredient("Yeast (Compressed)", "2", 1.05, 0));
  ingredients.set("153", new Ingredient("Yeast (Wild)", "2", 0, 0));
  ingredients.set("154", new Ingredient("All-Purpose Flour", "1", 3.64, 0));
  ingredients.set("155", new Ingredient("Bread Flour", "1", 3.64, 0));
  ingredients.set("156", new Ingredient("Whole Wheat Flour", "1", 3.4, 0));
  ingredients.set("157", new Ingredient("Almond Meal", "1", 5.65, 0));
  ingredients.set("158", new Ingredient("Buckwheat Flour", "1", 3.64, 0));
  ingredients.set("159", new Ingredient("Cake Flour", "1", 3.62, 0));
  ingredients.set(
    "160",
    new Ingredient("Chickpea Flour (Gram, Besan)", "1", 3.87, 0)
  );
  ingredients.set("161", new Ingredient("Durum Flour", "1", 3.39, 0));
  ingredients.set("162", new Ingredient("Flax Meal", "1", 4.61, 0));
  ingredients.set("163", new Ingredient("Hazelnut Meal", "1", 6.42, 0));
  ingredients.set("164", new Ingredient("Malt Powder", "1", 1.3, 0));
  ingredients.set("165", new Ingredient("Oat Flour", "1", 4.04, 0));
  ingredients.set("166", new Ingredient("Oat Bran", "1", 2.46, 0));
  ingredients.set("167", new Ingredient("Pecan Meal", "1", 6.66, 0));
  ingredients.set("168", new Ingredient("Potato Flour", "1", 3.28, 0));
  ingredients.set("169", new Ingredient("Potato Starch", "1", 3.33, 0));
  ingredients.set("170", new Ingredient("Pumpernickle Flour", "1", 3.66, 0));
  ingredients.set("171", new Ingredient("Rice Flour", "1", 3.66, 0));
  ingredients.set("172", new Ingredient("Rice Flour (Brown)", "1", 3.63, 0));
  ingredients.set("173", new Ingredient("Rye Flour (Light)", "1", 3.84, 0));
  ingredients.set("174", new Ingredient("Rye Flour (Medium)", "1", 3.54, 0));
  ingredients.set("175", new Ingredient("Rye Flour (Dark)", "1", 3.66, 0));
  ingredients.set("176", new Ingredient("Semolina Flour", "1", 3.6, 0));
  ingredients.set("177", new Ingredient("Spelt Flour", "1", 3.8, 0));
  ingredients.set("178", new Ingredient("Tapioca Starch", "1", 3.33, 0));
  ingredients.set("179", new Ingredient("Teff Flour", "1", 3.76, 0));
  ingredients.set("180", new Ingredient("Vital Wheat Gluten", "1", 3.7, 0));
  ingredients.set(
    "181",
    new Ingredient("Tarwemeel De Vriendschap", "1", 3.7, 0.816)
  );
  ingredients.set(
    "182",
    new Ingredient("Roggemeel De Vriendschap", "1", 3.7, 0.816)
  );
  ingredients.set(
    "183",
    new Ingredient("Boekweitmeel De Vriendschap", "1", 3.7, 1.92)
  );
  ingredients.set("184", new Ingredient("Zonnebloemolie Dirk", "8", 3.7, 2.79));
  ingredients.set(
    "185",
    new Ingredient("Bakkerszout De Vriendschap", "6", 3.7, 0.96)
  );
  ingredients.set(
    "186",
    new Ingredient("Harina integral de centeno Jumbo", "1", 3.7, 1899)
  );
  ingredients.set(
    "187",
    new Ingredient("Harina integral de trigo  Jumbo", "1", 3.7, 2299)
  );
  ingredients.set(
    "188",
    new Ingredient("Aceite Vegetal Lider", "8", 3.7, 2290)
  );
  ingredients.set(
    "189",
    new Ingredient("Sal Fina Seleccionada Lider", "6", 3.7, 350)
  );
  ingredients.set("190", new Ingredient("Agua", "4", 0, 0));
  ingredients.set("191", new Ingredient("Rye Meal (Course)", "1", 3.84, 0));
  ingredients.set("192", new Ingredient("Red Rye Malt", "1", 3.84, 0));
  ingredients.set("193", new Ingredient("Water (Boiling)", "4", 0, 0));
  ingredients.set("194", new Ingredient("Coriander (Ground)", "15", 0, 0));
  ingredients.set("195", new Ingredient("Molasse (Dark)", "7", 0, 0));
  ingredients.set("196", new Ingredient("Coriander Seed", "15", 0, 0));
  ingredients.set("197", new Ingredient("Koekkruiden", "15", 0, 0));
  ingredients.set("198", new Ingredient("Sucade", "13", 0, 0));
  ingredients.set("199", new Ingredient("Zilvervliesrijst", "11", 0, 0));

  let recipeIngredients = [];
  let IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "174", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 1));
  recipes.set(
    "1",
    new Recipe("Rye Sour Culture", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "154", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 1));
  recipeIngredients.push(new RecipeIngredient(false, false, "150", 0.0025));
  recipes.set(
    "2",
    new Recipe("100% Poolish", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "154", 0.9));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 0.6));
  recipeIngredients.push(new RecipeIngredient(false, false, "102", 0.016));
  recipeIngredients.push(new RecipeIngredient(false, false, "150", 0.001));
  IncludedRecipes.push(new IncludedRecipe("2", 0.3));
  recipes.set(
    "3",
    new Recipe("Rustic boule", "1", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "174", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 1));
  IncludedRecipes.push(new IncludedRecipe("1", 0.1));
  recipes.set(
    "4",
    new Recipe("Sourdough predough", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "156", 0.6));
  recipeIngredients.push(new RecipeIngredient(true, false, "174", 0.4));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 0.65));
  recipeIngredients.push(new RecipeIngredient(false, true, "15", 0.04));
  recipeIngredients.push(new RecipeIngredient(false, false, "102", 0.016));
  IncludedRecipes.push(new IncludedRecipe("4", 0.1));
  recipes.set(
    "5",
    new Recipe("Paul's wheat-rye bus", "2", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "154", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 0.6667));
  recipeIngredients.push(new RecipeIngredient(false, false, "102", 0.0117));
  recipeIngredients.push(new RecipeIngredient(false, false, "150", 0.0183));
  IncludedRecipes.push(new IncludedRecipe("2", 0.3333));
  recipes.set(
    "6",
    new Recipe(
      "Yeastbread with Poolish",
      "1",
      recipeIngredients,
      IncludedRecipes
    )
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "181", 0.5));
  recipeIngredients.push(new RecipeIngredient(true, false, "182", 0.3));
  recipeIngredients.push(new RecipeIngredient(true, false, "183", 0.2));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 0.7));
  recipeIngredients.push(new RecipeIngredient(false, true, "184", 0.04));
  recipeIngredients.push(new RecipeIngredient(false, false, "185", 0.016));
  IncludedRecipes.push(new IncludedRecipe("8", 0.2));
  recipes.set(
    "7",
    new Recipe(
      "Tarwe rogge boekweit volkeren zuurdesem",
      "2",
      recipeIngredients,
      IncludedRecipes
    )
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "182", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 1));
  IncludedRecipes.push(new IncludedRecipe("9", 0.1));
  recipes.set(
    "8",
    new Recipe("Voordeeg", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "182", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 1));
  recipes.set(
    "9",
    new Recipe("Zuurdesem starter", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "186", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "190", 1));
  recipeIngredients.push(new RecipeIngredient(false, false, "190", 1));
  recipes.set(
    "10",
    new Recipe("Masa madre", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "186", 0.1));
  recipeIngredients.push(new RecipeIngredient(true, false, "187", 0.9));
  recipeIngredients.push(new RecipeIngredient(false, true, "190", 1));
  IncludedRecipes.push(new IncludedRecipe("10", 0.1));
  recipes.set(
    "11",
    new Recipe("Masa previa", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "182", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 1));
  recipeIngredients.push(new RecipeIngredient(false, false, "109", 1));
  recipes.set(
    "12",
    new Recipe("Ander simpel voordeeg", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "187", 0.975));
  recipeIngredients.push(new RecipeIngredient(true, false, "186", 0.025));
  recipeIngredients.push(new RecipeIngredient(false, true, "190", 0.75));
  recipeIngredients.push(new RecipeIngredient(false, true, "188", 0.05));
  recipeIngredients.push(new RecipeIngredient(false, false, "189", 0.018));
  IncludedRecipes.push(new IncludedRecipe("11", 0.25));
  recipes.set(
    "13",
    new Recipe("Pan Karen", "2", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "182", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 1));
  recipes.set(
    "14",
    new Recipe("Voordeeg simpel", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "182", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 0.6667));
  IncludedRecipes.push(new IncludedRecipe("14", 0.2));
  IncludedRecipes.push(new IncludedRecipe("12", 0.1));
  recipes.set(
    "15",
    new Recipe("Testbrood", "1", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "174", 1));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 1.589));
  IncludedRecipes.push(new IncludedRecipe("1", 0.1071));
  recipes.set(
    "16",
    new Recipe("Sponge", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "191", 1));
  recipeIngredients.push(new RecipeIngredient(false, false, "192", 0.3));
  recipeIngredients.push(new RecipeIngredient(false, true, "193", 2.61));
  recipeIngredients.push(new RecipeIngredient(false, false, "194", 0.03));
  recipes.set(
    "17",
    new Recipe("Scald", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  recipeIngredients.push(new RecipeIngredient(true, false, "174", 0.71));
  recipeIngredients.push(new RecipeIngredient(true, false, "191", 0.29));
  recipeIngredients.push(new RecipeIngredient(false, false, "192", 0.089));
  recipeIngredients.push(new RecipeIngredient(false, true, "193", 0.76));
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 1.13));
  recipeIngredients.push(new RecipeIngredient(false, false, "194", 0.01));
  IncludedRecipes.push(new IncludedRecipe("16", 0.71));
  IncludedRecipes.push(new IncludedRecipe("17", 0.29));
  recipes.set(
    "18",
    new Recipe("Scald-Sponge", "3", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  // Medium Rye Flour
  recipeIngredients.push(new RecipeIngredient(true, false, "174", 0.66));
  // Rye Meal (Course)
  recipeIngredients.push(new RecipeIngredient(true, false, "191", 0.15));
  // Bread Flour
  recipeIngredients.push(new RecipeIngredient(true, false, "155", 0.19));
  // Red Rye Malt
  // recipeIngredients.push(new RecipeIngredient(false, false, "192", 0.06));
  // Water (Boiling)
  recipeIngredients.push(new RecipeIngredient(false, true, "193", 0.4));
  // Water
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 0.6));
  // Coriander (Ground)
  recipeIngredients.push(new RecipeIngredient(false, false, "194", 0.0054));
  //  Sea Salt
  recipeIngredients.push(new RecipeIngredient(false, false, "102", 0.013));
  // Molasse (Dark)
  recipeIngredients.push(new RecipeIngredient(false, false, "195", 0.054));
  // Coriander Seed
  recipeIngredients.push(new RecipeIngredient(false, false, "196", 0.0027));
  IncludedRecipes.push(new IncludedRecipe("18", 0.53));
  recipes.set(
    "19",
    new Recipe("GOST Borondinsky", "2", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  // Bread Flour
  recipeIngredients.push(new RecipeIngredient(true, false, "155", 1));
  // Water
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 1));
  // Suiker
  recipeIngredients.push(new RecipeIngredient(false, false, "86", 0.46));
  // Raisins
  recipeIngredients.push(new RecipeIngredient(false, false, "66", 0.3));
  // Baking powder
  recipeIngredients.push(new RecipeIngredient(false, false, "104", 0.015));
  // Koekkruiden
  recipeIngredients.push(new RecipeIngredient(false, false, "197", 0.075));
  //  Sea Salt
  recipeIngredients.push(new RecipeIngredient(false, false, "102", 0.009));
  recipes.set(
    "20",
    new Recipe("Kruidkoek", "10", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  // Bread Flour
  recipeIngredients.push(new RecipeIngredient(true, false, "155", 0.8));
  // Roggemeel de Vriendschap
  recipeIngredients.push(new RecipeIngredient(true, false, "182", 0.2));
  // Water
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 0.2));
  // Buttermilk
  recipeIngredients.push(new RecipeIngredient(false, true, "125", 0.8));
  // Suiker
  recipeIngredients.push(new RecipeIngredient(false, false, "86", 0.35));
  // Raisins
  recipeIngredients.push(new RecipeIngredient(false, false, "66", 0.3));
  // Water
  recipeIngredients.push(new RecipeIngredient(false, false, "109", 0.03));
  // Egg
  recipeIngredients.push(new RecipeIngredient(false, false, "134", 0.14));
  // Sucade
  recipeIngredients.push(new RecipeIngredient(false, false, "198", 0.14));
  // Baking powder
  recipeIngredients.push(new RecipeIngredient(false, false, "104", 0.01));
  // Koekkruiden
  recipeIngredients.push(new RecipeIngredient(false, false, "197", 0.075));
  //  Sea Salt
  recipeIngredients.push(new RecipeIngredient(false, false, "102", 0.009));
  // Voordeeg
  IncludedRecipes.push(new IncludedRecipe("8", 0.2));
  recipes.set(
    "21",
    new Recipe("Kruidkoek zuurdesem", "10", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  // Tarwemeel de Vriendschap
  recipeIngredients.push(new RecipeIngredient(true, false, "181", 0.9687));
  // Roggemeel de Vriendschap
  recipeIngredients.push(new RecipeIngredient(true, false, "182", 0.0313));
  // Water
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 0.8));
  // Zilvervliesrijst
  recipeIngredients.push(new RecipeIngredient(false, false, "199", 0.2));
  // Geabsorbeerd Water
  recipeIngredients.push(new RecipeIngredient(false, false, "109", 0.1));
  // Zonnebloemolie
  recipeIngredients.push(new RecipeIngredient(false, true, "184", 0.05));
  //  Sea Salt
  recipeIngredients.push(new RecipeIngredient(false, false, "102", 0.016));
  // Voordeeg
  IncludedRecipes.push(new IncludedRecipe("13", 0.375));
  recipes.set(
    "22",
    new Recipe("Rijstebrood Anneé", "2", recipeIngredients, IncludedRecipes)
  );

  recipeIngredients = [];
  IncludedRecipes = [];
  // Tarwemeel de Vriendschap
  recipeIngredients.push(new RecipeIngredient(true, false, "181", 0.9167));
  // Roggemeel de Vriendschap
  recipeIngredients.push(new RecipeIngredient(true, false, "182", 0.0833));
  // Water
  recipeIngredients.push(new RecipeIngredient(false, true, "109", 0.6666));
  // Voordeeg
  IncludedRecipes.push(new IncludedRecipe("9", 0.0833));
  recipes.set(
    "13",
    new Recipe("Voordeeg Rijstebrood", "3", recipeIngredients, IncludedRecipes)
  );

  return new RecipeBook(
    "ingredientBook",
    recipeCategories,
    ingredientCategories,
    ingredients,
    recipes
  );
}

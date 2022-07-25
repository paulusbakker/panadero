public class RecipeIngredient {

    boolean flour;
    boolean hydration;
    int id;
    double percent;
    boolean isRecipe;

    public RecipeIngredient(boolean flour, boolean hydration, int id, double percent, boolean isRecipe) {
        this.flour = flour;
        this.hydration = hydration;
        this.id = id;
        this.percent = percent;
        this.isRecipe = isRecipe;
    }
}

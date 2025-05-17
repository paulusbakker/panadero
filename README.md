# Panadero - Bread Recipe Calculator

![Panadero Logo](public/bread.256x172.png)

## Project Overview

Panadero (Spanish for "baker") is a React application for managing bread recipes. It allows users to create, view, and edit recipes, calculate ingredient amounts based on desired batch sizes, and track costs.

## Application Structure

```
panadero/
├── src/
│   ├── atom/              # Recoil state atoms
│   ├── classes/           # Class definitions (FlattenedRecipeItem, Issue)
│   ├── constants/         # Application constants
│   ├── global_style & theme/ # Global styling
│   ├── helper/            # Helper functions
│   ├── pages/             # Application pages
│   │   ├── ingredient/    # Ingredient management
│   │   ├── main/          # Main page with navigation
│   │   ├── noPage/        # 404 page
│   │   └── recipe/        # Recipe pages
│   │       ├── edit/      # Recipe editing
│   │       └── view/      # Recipe viewing
│   └── shared_components/ # Reusable components
└── public/                # Static assets
```

## Application Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Main Page  │────▶│  View Recipe │────▶│  Edit Recipe │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Ingredients │     │ Recipe Card  │     │Recipe Editor│
└─────────────┘     └─────────────┘     └─────────────┘
```

## Key Components

### Recipe Management

1. **Recipe Book**: Central storage for all recipes and ingredients
2. **Flattened Recipe**: Processed version of a recipe with all included sub-recipes expanded
3. **Recipe Card**: Visual representation of a recipe with ingredients and calculations

### Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Recipe Book  │────▶│flattenRecipe│────▶│ Calculations│
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   UI View    │◀────│  React State │◀────│ Processed   │
└─────────────┘     └─────────────┘     │    Data     │
                                         └─────────────┘
```

## Key Features

### Recipe Calculation

The application calculates:
- Total flour weight
- Total liquid weight
- Baker's percentages (ingredients as percentage of flour weight)
- Step percentages (for multi-stage recipes)
- Recipe costs

### Recipe Validation

Recipes are validated for:
- Total flour percentage equals 100%
- No negative step percentages
- All ingredients in sub-recipes are present in parent recipes
- No missing ingredients

## User Interface

### Main Views

1. **Recipe List**: Browse all available recipes
2. **Ingredient List**: Manage ingredients and their costs
3. **View Recipe**: See recipe details, calculate amounts, check costs
4. **Edit Recipe**: Modify recipe structure and ingredients

### Recipe Card

The recipe card shows:
- Recipe name and structure
- Ingredients with their percentages and weights
- Sub-recipes with their components
- Total flour and liquid weights
- Recipe cost

## How to Use

1. **Browse Recipes**: Start at the main page to see all available recipes
2. **View Recipe**: Click on a recipe to see its details
3. **Calculate Amounts**: Enter desired batch size to calculate ingredient weights
4. **Edit Recipe**: Modify ingredients, percentages, or add sub-recipes
5. **Manage Ingredients**: Add new ingredients or update costs

## Technical Implementation

- **React**: Frontend framework
- **React Router**: Navigation between pages
- **Recoil**: State management
- **Styled Components**: Styling
- **Custom Algorithms**: Recipe flattening and calculation

## Recipe Structure

Recipes in Panadero follow a hierarchical structure:

```
Recipe
├── Flour ingredients (100% total)
├── Liquid ingredients
├── Other ingredients
└── Sub-recipes
    ├── Flour ingredients
    ├── Liquid ingredients
    └── Other ingredients
```

Each ingredient has:
- Name
- Percentage (relative to flour weight)
- Type (flour, liquid, other)
- Cost per unit

## Calculation Logic

1. **Baker's Percentages**: All ingredients are expressed as percentages of the total flour weight
2. **Flattening**: Sub-recipes are expanded into the main recipe
3. **Step Percentages**: For multi-stage recipes, the percentage of each ingredient used at each stage
4. **Weight Calculation**: Based on desired batch size, all percentages are converted to weights

## Screenshots

### Main Recipe List
*Screenshot showing the main page with a list of available recipes*

### Recipe View
*Screenshot showing a recipe with its ingredients, percentages, and calculated weights*

### Recipe Edit
*Screenshot showing the recipe editing interface*

### Calculation Popup
*Screenshot showing the popup for entering batch size and calculating weights*

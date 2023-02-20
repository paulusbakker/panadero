import { atom } from "recoil";
import { makeRecipeBook } from "../helper/makeRecipeBook";

export const recipeBookAtom = atom({
  key: "recipeBook",
  default: makeRecipeBook(),
});
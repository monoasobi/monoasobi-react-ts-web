import { localStorageEffect } from "@utils/storageEffect";
import { atom } from "recoil";

export const fontAtom = atom<"gothic" | "batang">({
  key: "font",
  default: "batang",
  effects: [localStorageEffect("font")],
});

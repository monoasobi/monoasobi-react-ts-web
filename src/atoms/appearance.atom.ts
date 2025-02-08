import { localStorageEffect } from "@utils/storageEffect";
import { atom } from "recoil";

export const appearanceAtom = atom<"light" | "dark">({
  key: "appearance",
  default: "light",
  effects: [localStorageEffect("appearance")],
});

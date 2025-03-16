import { localStorageEffect } from "@utils/storageEffect";
import { atom } from "recoil";

export const adminAtom = atom<boolean>({
  key: "admin",
  default: false,
  effects: [localStorageEffect("admin")],
});

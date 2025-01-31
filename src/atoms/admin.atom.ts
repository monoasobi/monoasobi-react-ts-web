import { atom } from "recoil";

export const adminAtom = atom<boolean>({
  key: "admin",
  default: false,
});

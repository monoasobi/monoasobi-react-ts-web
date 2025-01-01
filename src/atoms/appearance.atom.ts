import { atom } from "recoil";

export const appearanceAtom = atom<"light" | "dark">({
  key: "appearance",
  default: "light",
});

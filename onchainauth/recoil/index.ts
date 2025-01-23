import { atom } from "recoil";

type Password = {
  key: string;
  password: string;
};

type PasswordManagerState = {
  [walletAddress: string]: Password[];
};
export const walletAddress = atom<PasswordManagerState>({
  key: "wallet",
  default: {},
});

export interface Vault {
  id: number;
  name: string;
  owner: string;
  password: string;
}

// export const vaultsState = atom<Vault[]>({
//   key: "vaultsState",
//   default: [
//     { id: 1, name: "Personal Vault", owner: "John Doe", password: "enfje" },
//     { id: 2, name: "Team Vault", owner: "Jane Smith", password: "enfe" },
//   ],
// });

export const vaultsState = atom<Vault[]>({
  key: "valutsState",
  default: [],
});

export const fontSizeState = atom({
  key: "fontSizeState",
  default: 14,
});

import { create } from "zustand";

type Password = {
  key: string;
  password: string;
};

type PasswordManagerState = {
  [walletAddress: string]: Password[];
};

export interface Vault {
  id: number;
  name: string;
  owner: string;
  password: string;
}

type VaultState = {
  vaults: Vault[];
};

type VaultStateActions = {
  addVault: (vault: Vault) => void;
  removeVault: (vaultId: number) => void;
  updateVault: (updatedVault: Vault) => void;
};
export const useVaultStore = create<VaultState & VaultStateActions>((set) => ({
  vaults: [
    {
      id: 1,
      name: "ankur",
      owner: "ankur",
      password: "lado",
    },
  ],
  addVault: (vault: Vault) => {
    set((state) => ({
      vaults: [...state.vaults, { ...vault, id: Date.now() }],
    }));
  },
  removeVault: (vaultId: number) => {
    set((state) => ({
      vaults: state.vaults.filter((vault) => vault.id !== vaultId),
    }));
  },
  updateVault: (updatedVault: Vault) => {
    set((state) => ({
      vaults: state.vaults.map((vault) =>
        vault.id === updatedVault.id ? { ...updatedVault } : vault
      ),
    }));
  },
}));

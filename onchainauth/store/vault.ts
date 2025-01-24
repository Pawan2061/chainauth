import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

export const useVaultStore = create(
  persist<VaultState & VaultStateActions>(
    (set) => ({
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
    }),
    {
      name: "vault-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

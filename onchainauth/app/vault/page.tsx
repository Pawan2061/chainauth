"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EllipsisVertical } from "lucide-react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fontSizeState, vaultsState, walletAddress } from "../../recoil/index";
import { AddPassword } from "@/components/ui/addPassword";
import { useStore } from "zustand";
import { useVaultStore } from "@/store/vault";

export default function Vault() {
  const { vaults, addVault } = useVaultStore();

  const [showCard, setShowCard] = useState(false);
  const setPassword = useSetRecoilState(walletAddress);

  const addPassword = (pubkey: string, key: string, password: string) => {
    setPassword((prevState) => ({
      ...prevState,
      [pubkey]: [...(prevState[pubkey] || []), { key, password }],
    }));
  };

  console.log(localStorage.getItem("pubkey"));

  const addNewVault = () => {
    setShowCard(!showCard);
  };

  return (
    <section className={`container mx-auto max-w-6xl py-8 relative `}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-semibold text-2xl">All vaults</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-500 text-white"
          onClick={addNewVault}
        >
          + New
        </Button>
      </div>
      {showCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={addNewVault}
            >
              X
            </button>
            <AddPassword vaults={vaults} addVault={addVault} />
          </div>
        </div>
      )}
      <main className="space-y-4">
        <div className="grid grid-cols-5 items-center gap-4 p-4 rounded-lg border bg-gray-600">
          <div className="flex items-center">
            <Checkbox />
          </div>
          <div className="font-medium">Names</div>
          <div className="font-medium">Owner</div>
          <div className="font-medium">Password</div>

          <div className="flex justify-end">
            <EllipsisVertical className="cursor-pointer" />
          </div>
        </div>

        {vaults.map((vault) => (
          <div
            key={vault.id}
            className="grid grid-cols-5 items-center gap-4 p-4 rounded-lg border  transition-colors"
          >
            <div className="flex items-center">
              <Checkbox />
            </div>
            <div className="text-sm">{vault.name}</div>
            <div className="text-sm text-gray-600">{vault.owner}</div>
            <div className="text-sm text-gray-600 ">{vault.password}</div>

            <div className="flex justify-end left-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => console.log(`Options for vault ${vault.id}`)}
              >
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
}
